import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export class ProductDto {
  @Expose()
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Expose()
  title: string;

  @Field(() => String, { nullable: true })
  @Expose()
  photo?: string;
  @Field(() => Int)
  @Expose()
  stockQuantity: number;

  @Field(() => Float)
  @Expose()
  price: number; // exposed in dollars

  @Field(() => ID)
  @Expose()
  vendorId: string;

  @Field(() => Date)
  @Expose()
  createdAt: Date;

  @Field(() => Date)
  @Expose()
  updatedAt: Date;
  
}
