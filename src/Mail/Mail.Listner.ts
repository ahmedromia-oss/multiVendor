import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { IClientService } from 'Interfaces/IServices/IClientService';
import { INotificationService } from 'Interfaces/IServices/INotificationService';
import { IOrderService } from 'Interfaces/IServices/IOrderService';
import { OrderEvents, OrderStatus, SERVICE_TOKENS } from 'shared/constants';

@Injectable()
export class EmailListener {
  constructor(
    @Inject(SERVICE_TOKENS.INotificationService)
    private readonly mailService: INotificationService,
    @Inject(SERVICE_TOKENS.IOrderService)
    private readonly orderService: IOrderService,
  ) {}
  @OnEvent(OrderEvents.ORDER_PROCESSING)
  async handleUserCreated(orderId: string) {
    const clientMail = (
      await this.orderService.findOne({
        where: { id: orderId },
        relations: { cart: { client: true } },
      })
    ).cart.client.user.email;
    await this.mailService.addJob({
      title: 'order processed',
      type: OrderStatus.PROCESSING,
      recipient: clientMail,
      message: 'your order is processed succefully',
    });
  }
}
