import { User } from "src/User/user.model.js";
import { IBaseService } from "./IBaseService";
import { Cart } from "src/Cart/cart.model";

export interface ICartService extends IBaseService<Cart> {
  
}