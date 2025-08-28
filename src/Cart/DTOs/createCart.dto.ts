import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class createCartDto{
    @Field(()=>ID)
    clientId:string
}