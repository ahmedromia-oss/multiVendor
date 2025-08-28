import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { OrderStatus } from 'shared/constants';
import { CartGetDTO } from 'src/Cart/DTOs/getCart.dto';
@ObjectType()
export class getOrderDto {
  @Expose()
  @Field(()=>ID)
  id: string;
  @Expose()
  @Field(()=>String)

  status: OrderStatus;
  @Field(()=>Number)

  @Expose()
  subTotal: number;
  @Field(()=>Number , {nullable:true})

  @Expose()
  shippingFee: number;
  @Field(()=>CartGetDTO)

  @Expose()
  cart: CartGetDTO;
  @Field(()=>String)

  @Expose()
  cartId: string;
}
