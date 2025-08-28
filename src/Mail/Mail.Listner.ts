import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { INotificationService } from 'Interfaces/IServices/INotificationService';
import { OrderEvents, OrderStatus, SERVICE_TOKENS } from 'shared/constants';

@Injectable()
export class EmailListener {
  constructor(
    @Inject(SERVICE_TOKENS.INotificationService)
    private readonly mailService: INotificationService,
  ) {}
  @OnEvent(OrderEvents.ORDER_PROCESSING)
  async handleUserCreated() {
    await this.mailService.addJob({
      title: 'hello',
      type: OrderStatus.PROCESSING,
      recipient: 'homelandereg@gmail.com',
      message: 'hello this is just a test',
    });
  }
}
