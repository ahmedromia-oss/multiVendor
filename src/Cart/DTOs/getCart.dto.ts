import { Field, ObjectType, ID, Float } from '@nestjs/graphql';
import { Expose, Transform, Type } from 'class-transformer';
import { CartStatus } from 'shared/constants';
import { CartItem } from 'src/CartItem/CartItem.model';
import { CartItemDto } from 'src/CartItem/DTOs/getCartItem.dto';
import { GetClientDto } from 'src/Client/DTOs/getclient.dto';

@ObjectType()
export class CartGetDTO {
  @Field(() => ID)
  @Expose()
  id: string;

  @Field(() => GetClientDto)
  @Expose()
  client: GetClientDto;

  @Field(() => ID)
  @Expose()
  clientId: string;

  @Field(() => [CartItemDto])
  @Expose()
  @Type(()=>CartItemDto)
  items: CartItemDto[];

  @Field(() => String)
  @Expose()
  status: CartStatus;

  @Field(() => Date)
  @Expose()
  createdAt: Date;

  @Field(() => Date)
  @Expose()
  updatedAt: Date;

  @Field(() => Float)
  @Expose()
  @Transform(({ value }) => value / 100)
  totalAmount: number;
}
