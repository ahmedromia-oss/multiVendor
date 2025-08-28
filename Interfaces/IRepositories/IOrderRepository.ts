import { Order } from 'src/Order/order.model';
import { IBaseRepository } from './IBaseRepository';

export interface IOrderRepository extends IBaseRepository<Order> {}
