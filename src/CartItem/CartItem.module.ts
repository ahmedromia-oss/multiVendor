import { Module } from '@nestjs/common';
import { CartItem } from './CartItem.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemRepository } from './CartItem.repository';
import { CartItemService } from './CartItem.service';
import { CartItemResolver } from './CartItem.resolver';
import { ProductModule } from 'src/Product/product.module';
import {
  REPOSITORY_TOKENS,
  RESOLVER_TOKENS,
  SERVICE_TOKENS,
} from 'shared/constants';
import { CartModule } from 'src/Cart/cart.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem]), ProductModule , CartModule],
  providers: [
    {
      provide: SERVICE_TOKENS.ICartItemService, // inject via token
      useClass: CartItemService, // concrete implementation
    },
    {
      provide: REPOSITORY_TOKENS.ICartItemRepository,
      useClass: CartItemRepository,
    },
    CartItemResolver,
  ],
  exports: [
    { provide: SERVICE_TOKENS.ICartItemService, useClass: CartItemService }, // so other modules can use it
  ],
})
export class CartItemModule {}
