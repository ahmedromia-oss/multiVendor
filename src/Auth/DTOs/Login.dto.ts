import { Field, InputType } from "@nestjs/graphql";
import { Exclude, Expose, Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
@InputType()
export class LoginDto {
  @IsNotEmpty()
  @Field(()=>String)
  @Transform(({ value }) => value?.toLowerCase())
  @Expose()
  email: string;
  @IsNotEmpty()
  @Field(()=>String)

  @Expose()
  password: string;
}