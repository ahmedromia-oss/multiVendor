import { EntryType } from 'perf_hooks';
import { BaseService } from 'shared/Services/BaseService';
import { Order } from 'src/Order/order.model';
import { DeepPartial, EntityManager } from 'typeorm';

export interface IOrderService extends BaseService<Order> {
  checkOut(clientId: string,data: DeepPartial<Order>,manager?: EntityManager): Promise<Order>;
  markShipped(orderId:string , manager?:EntityManager):Promise<boolean>
  markDelivered(orderId:string , manager?:EntityManager):Promise<boolean>
}
