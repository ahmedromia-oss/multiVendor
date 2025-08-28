import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/Cart/cart.model';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { Order } from './order.model';
import { CartService } from 'src/Cart/cart.service';
import { CartModule } from 'src/Cart/cart.module';
import { CartItemService } from 'src/CartItem/CartItem.service';
import { CartItemModule } from 'src/CartItem/CartItem.module';
import { REPOSITORY_TOKENS, SERVICE_TOKENS } from 'shared/constants';
import { OrderResolver } from './order.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), CartModule , CartItemModule],
  providers: [
    OrderResolver,
    {
      provide: SERVICE_TOKENS.IOrderService, // inject via token
      useClass: OrderService, // concrete implementation
    },
    {
      provide: REPOSITORY_TOKENS.IOrderRepository,
      useClass: OrderRepository,
    },
  ],
  exports: [
    { provide: SERVICE_TOKENS.IOrderService, useClass: OrderService }, // so other modules can use it
  ],
})
export class OrderModule {}
