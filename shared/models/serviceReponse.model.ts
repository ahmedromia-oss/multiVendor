import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ServiceResponse<T> {
  @Field(() => String)
  code: string;

  @Field( { nullable: true })
  data?: T;

  @Field({ nullable: true })
  Errors?: any[] | any = [];
}
