import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Expose, Type } from 'class-transformer';
import { ProductDto } from 'src/Product/DTOs/getProduct.dto';

@ObjectType()
export class CartItemDto {
  @Field(() => ID)
  @Expose()
  id: string;

  @Field(() => ID)
  @Expose()
  cartId: string;

  @Field(() => ID)
  @Expose()
  productId: string;

  @Field(() => ProductDto)
  @Expose()
  @Type(() => ProductDto)
  product: ProductDto;

  @Field(() => Int)
  @Expose()
  quantity: number;

  @Field(() => Int, {
    description: 'Total price for this cart item (quantity * product price)',
  })
  @Expose()
  totalPrice: number; // This will call the getter from CartItem entity

  @Field(() => Date)
  @Expose()
  createdAt: Date;

  @Field(() => Date)
  @Expose()
  updatedAt: Date;
}
