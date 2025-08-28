import { Cart } from 'src/Cart/cart.model';
import { IBaseResolver } from './IBaseResolver';
import { createCartDto } from 'src/Cart/DTOs/createCart.dto';
import { UserToken } from 'shared/models/userToken.model';

export interface ICartResolver extends IBaseResolver<Cart> {
  getCartById(cartId: string, user: UserToken): Promise<Cart>;

  createCart(user: UserToken): Promise<Cart>;
}
