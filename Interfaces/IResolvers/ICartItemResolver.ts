import { CartItem } from 'src/CartItem/CartItem.model';
import { IBaseResolver } from './IBaseResolver';
import { UserToken } from 'shared/models/userToken.model';
import { updateCartItem } from 'src/CartItem/DTOs/updateCartItem.dto';

export interface ICartItemResolver extends IBaseResolver<CartItem> {
  updateQuantity(data: updateCartItem, user: UserToken):Promise<String>;
}
