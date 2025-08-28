import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString, Length } from "class-validator";

@InputType()
export class UpdateClientDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(1, 150)
  address?: string;
}