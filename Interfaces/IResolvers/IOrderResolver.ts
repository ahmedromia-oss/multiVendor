import { BaseResolver } from 'shared/BaseResolver';
import { UserToken } from 'shared/models/userToken.model';
import { updateOrderDto } from 'src/Order/DTOs/updateOrder.dto';
import { Order } from 'src/Order/order.model';

export interface IOrderResolver extends BaseResolver<Order> {
  checkOut(data: updateOrderDto, user: UserToken): Promise<Order>;
}
