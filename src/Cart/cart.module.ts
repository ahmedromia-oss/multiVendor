import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.model';
import { CartService } from './cart.service';
import { CartRepository } from './cart.repository';
import { CartResolver } from './cart.resolver';
import { REPOSITORY_TOKENS, RESOLVER_TOKENS, SERVICE_TOKENS } from 'shared/constants';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  providers: [
    {
      provide: SERVICE_TOKENS.ICartService, // inject via token
      useClass: CartService, // concrete implementation
    },
    {
      provide: REPOSITORY_TOKENS.ICartRepository,
      useClass: CartRepository,
    },
    CartResolver
  ],
  exports: [
    { provide: SERVICE_TOKENS.ICartService, useClass: CartService }, // so other modules can use it
  ],
})
export class CartModule {}
