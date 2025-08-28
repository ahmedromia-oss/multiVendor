import { User } from "src/User/user.model";
import { IBaseRepository } from "./IBaseRepository";
import { Product } from "src/Product/product.model";


export interface IProductRepository extends IBaseRepository<Product>{

}