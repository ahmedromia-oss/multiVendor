import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString, Length } from "class-validator";

@InputType()
export class UpdateVendorDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  storeName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(1, 150)
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  address?: string;
}