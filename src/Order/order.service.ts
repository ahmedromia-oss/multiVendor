import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from 'shared/Services/BaseService';
import { Order } from './order.model';
import { IOrderService } from 'Interfaces/IServices/IOrderService';
import { IOrderRepository } from 'Interfaces/IRepositories/IOrderRepository';
import { DeepPartial, EntityManager, MoreThan } from 'typeorm';
import { ICartService } from 'Interfaces/IServices/ICartService';
import { IUnitOfWork } from 'Interfaces/IServices/IUnitOfWrokService';
import { ICartItemService } from 'Interfaces/IServices/ICartItemService';
import { IProductService } from 'Interfaces/IServices/IProductService';
import { CartItem } from 'src/CartItem/CartItem.model';
import {
  CartStatus,
  OrderEvents,
  OrderStatus,
  REPOSITORY_TOKENS,
  SERVICE_TOKENS,
} from 'shared/constants';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cart } from 'src/Cart/cart.model';
import { ClientService } from 'src/Client/client.service';

@Injectable()
export class OrderService extends BaseService<Order> implements IOrderService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @Inject(REPOSITORY_TOKENS.IOrderRepository)
    private readonly orderRepository: IOrderRepository,
    @Inject(SERVICE_TOKENS.ICartService)
    private readonly cartService: ICartService,
    @Inject(SERVICE_TOKENS.ICartItemService)
    private readonly cartItemService: ICartItemService,
    @Inject(SERVICE_TOKENS.IUnitOfWork) private readonly uow: IUnitOfWork,
  ) {
    super(orderRepository);
  }
  async markDelivered(
    orderId: string,
    manager?: EntityManager,
  ): Promise<boolean> {
    await this.orderRepository.update(
      { id: orderId },
      { status: OrderStatus.DELIVERED },
    );
    this.eventEmitter.emit(OrderEvents.ORDER_DELIVERED);
    return true;
  }
  async markShipped(
    orderId: string,
    manager?: EntityManager,
  ): Promise<boolean> {
    await this.orderRepository.update(
      { id: orderId },
      { status: OrderStatus.SHIPPED },
    );
    this.eventEmitter.emit(OrderEvents.ORDER_SHIPPED);
    return true;
  }

  private async checkForCart(
    transactionalManager: EntityManager,
    clientId: string,
    cartId: string,
  ): Promise<Cart> {
    const cart = await this.cartService.findOne(
      {
        where: { id: cartId, clientId: clientId },
        lock: { mode: 'pessimistic_write' },
      },
      transactionalManager,
    );
    return cart;
  }

  private async updatingStock(
    transactionalManager: EntityManager,
    cart: Cart,
  ): Promise<CartItem[]> {
    const cartItems = await this.cartItemService.findAll(
      {
        where: { cartId: cart.id },

        lock: { mode: 'pessimistic_write' },
      },
      transactionalManager,
    );

    if (cartItems?.length > 0) {
      await this.cartItemService.updateTheStock(
        transactionalManager,
        cartItems,
      );
      await this.cartService.update(
        { id: cart.id },
        { status: CartStatus.COMPLETED },
        transactionalManager,
      );
      return cartItems;
    } else {
      throw new BadRequestException('Cart Is Empty');
    }
  }

  private async checkOutProcess(
    transactionalManager: EntityManager,
    clientId: string,
    data: DeepPartial<Order>,
  ) {
    const cart = await this.checkForCart(
      transactionalManager,
      clientId,
      data.cartId!,
    );
    if (cart.status == CartStatus.ACTIVE) {
      const cartItems = await this.updatingStock(transactionalManager, cart);

      const result = await this.orderRepository.create(
        {
          status: OrderStatus.PROCESSING,
          cartId: cart?.id,
          subTotal: cartItems.reduce(
            (sum, item) => sum + item.unit_price * item.quantity,
            0,
          ),
        },
        transactionalManager,
      );
      this.eventEmitter.emit(OrderEvents.ORDER_PROCESSING , result.id);
      return result;
    } else {
      throw new BadRequestException('Cart Already completed');
    }
  }

  async checkOut(
    clientId: string,
    data: DeepPartial<Order>,
    manager?: EntityManager,
  ): Promise<Order> {
    if (manager) {
      const result = await this.checkOutProcess(manager, clientId, data);
      return result;
    }
    const result = await this.uow.execute(
      async (transactionalManager: EntityManager) => {
        return await this.checkOutProcess(transactionalManager, clientId, data);
      },
    );
    return result;
  }
}
