import { Field, InputType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class updateCartItem {
  @Field(() => Number)
  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  @Field(() => String)
  @Expose()
  cartId: string;
  @IsNotEmpty()
  @Field(() => String)
  @Expose()
  productId: string;
}
