import { CartItem } from 'src/CartItem/CartItem.model';
import { IBaseService } from './IBaseService';
import { updateCartItem } from 'src/CartItem/DTOs/updateCartItem.dto';
import { Cart } from 'src/Cart/cart.model';
import { DeepPartial, EntityManager } from 'typeorm';

export interface ICartItemService extends IBaseService<CartItem> {
  updateQuantity(cartItem:DeepPartial<CartItem>, clientId: string): Promise<string>;
  updateTheStock(manager: EntityManager, items: DeepPartial<CartItem>[]) 
}
