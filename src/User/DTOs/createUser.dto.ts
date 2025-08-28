import { InputType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  Length,
  Matches,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { UserType, ValidationErrors } from 'shared/constants';

const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).{8,}$/;
const PASSWORD_MESSAGE =
  'Password must be at least 8 characters long and include at least one number and one special character.';

@InputType()
export class CreateUserDto {
  @Field({ description: 'User username' })
  @IsString()
  @IsNotEmpty({ message: 'username is required' })
  @Length(3, 100, { message: 'username must be between 3 and 100 characters' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  username: string;

  @Field({ description: 'User email address' })
  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsNotEmpty({ message: 'email is required' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  email: string;

  @Field({ description: 'User password' })
  @IsString()
  @IsNotEmpty({ message: 'password is required' })
  @Matches(PASSWORD_REGEX, { message: PASSWORD_MESSAGE })
  password: string;
  @Field(() => String)
  @IsEnum(UserType)
  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof value === 'string' ? value?.toUpperCase() : value,
  )
  userType: UserType;
}
