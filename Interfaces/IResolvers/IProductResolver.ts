import { CreateProductInput } from 'src/Product/DTOs/createProduct.dto';
import { IBaseResolver } from './IBaseResolver';
import { Product } from 'src/Product/product.model';
import { UpdateProductInput } from 'src/Product/DTOs/updateProduct.dto';
import { UserToken } from 'shared/models/userToken.model';

export interface IProductResolver extends IBaseResolver<Product> {
  findProducts(take?: number, skip?: number): Promise<Product[]>;

  createProduct(user:UserToken , data: CreateProductInput ): Promise<Product>;

  updateProduct(data: UpdateProductInput, user: UserToken): Promise<string>;

  DeleteProduct( productId:string , user: UserToken ): Promise<string>;
}
