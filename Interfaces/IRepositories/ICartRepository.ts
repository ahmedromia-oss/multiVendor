import { Cart } from "src/Cart/cart.model";
import { IBaseRepository } from "./IBaseRepository";
import { Client } from "src/Client/client.model";


export interface ICartRepository extends IBaseRepository<Cart>{

}