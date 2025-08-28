import { InputType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  Length,
  IsOptional,
} from 'class-validator';

@InputType()
export class UpdateUserDto {
  @Field({ nullable: true, description: 'User username' })
  @IsOptional()
  @IsString()
  @Length(3, 100, { message: 'username must be between 3 and 100 characters' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  username?: string;

  @Field({ nullable: true, description: 'User email address' })
  @IsOptional()
  @IsEmail({}, { message: 'email must be a valid email address' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  email?: string;
}