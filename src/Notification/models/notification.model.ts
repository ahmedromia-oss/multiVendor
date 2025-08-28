import { OrderStatus } from 'shared/constants';

export class Notification {
  recipient: string;
  type: OrderStatus;
  title: string;
  message: string;
}
