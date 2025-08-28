import { Field, ID, ObjectType, InputType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { IsOptional, IsString, Length, IsUUID } from 'class-validator';

@ObjectType()
export class GetClientDto {
  @Field(() => ID)
  @Expose()
  userId: string;

  @Field({ nullable: true })
  @Expose()
  phone?: string;

  @Field({ nullable: true })
  @Expose()
  address?: string;
}


