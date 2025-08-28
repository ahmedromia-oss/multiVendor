import { Field, ObjectType } from "@nestjs/graphql";
import { Expose } from "class-transformer";
@ObjectType()
export class AuthResponseDto {
  @Expose()
  @Field(()=>String)
  token: string;
}