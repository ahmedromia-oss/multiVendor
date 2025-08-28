import { BaseService } from 'shared/Services/BaseService';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  NotFoundException,
} from '@nestjs/common';

import { CartItem } from './CartItem.model';
import { ICartItemService } from 'Interfaces/IServices/ICartItemService';
import {
  DeepPartial,
  EntityManager,
  FindOptionsWhere,
  MoreThan,
} from 'typeorm';
import { updateCartItem } from './DTOs/updateCartItem.dto';
import { ICartItemRepository } from 'Interfaces/IRepositories/ICartItemRepository';
import {
  CartStatus,
  REPOSITORY_TOKENS,
  SERVICE_TOKENS,
  valuesString,
} from 'shared/constants';
import { Cart } from 'src/Cart/cart.model';
import { IUnitOfWork } from 'Interfaces/IServices/IUnitOfWrokService';
import { ProductService } from 'src/Product/product.service';
import { privateDecrypt } from 'crypto';
import { CartService } from 'src/Cart/cart.service';
import { ForbiddenError } from 'apollo-server-core';

export class CartItemService
  extends BaseService<CartItem>
  implements ICartItemService
{
  constructor(
    @Inject(REPOSITORY_TOKENS.ICartItemRepository)
    private readonly cartItemRepository: ICartItemRepository,
    @Inject(SERVICE_TOKENS.IUnitOfWork)
    private readonly uow: IUnitOfWork,
    @Inject(SERVICE_TOKENS.IProductService)
    private readonly productService: ProductService,
    @Inject(SERVICE_TOKENS.ICartService)
    private readonly cartService: CartService,
  ) {
    super(cartItemRepository);
  }
  async updateTheStock(manager: EntityManager, items: CartItem[]) {
    for (const item of items) {
      const product = await this.productService.findOne(
        {
          where: { id: item.productId },
          lock: { mode: 'pessimistic_write' },
        },
        manager,
      );

      if (product.stockQuantity < item.quantity) {
        throw new BadRequestException(
          `Not enough stock for product ${item.productId}`,
        );
      }

      await this.productService.update(
        { id: item.productId },
        { stockQuantity: product.stockQuantity - item.quantity },
        manager,
      );
    }
  }

  async updateQuantity(cartItem: CartItem, cleintId: string): Promise<string> {
    const product = await this.productService.findOne({
      where: { id: cartItem.id },
    });
    try {
      if (
        !(await this.cartService.checkIFExists({
          where: {
            id: cartItem.cartId,
            clientId: cleintId,
            status: CartStatus.ACTIVE,
          },
        }))
      ) {
        throw new NotFoundException();
      }

      if (product.stockQuantity >= cartItem.quantity) {
        return await this.cartItemRepository.update(
          {
            cartId: cartItem.cartId,
            unit_price: product.price,
            cart:{status:CartStatus.ACTIVE},

            productId: cartItem.productId,
          },

          {
            quantity: cartItem.quantity,
          },
        );
      } else {
        throw new BadRequestException('stock is inSufficient');
      }
    } catch (e) {
      if (e instanceof NotFoundException) {
        // console.log(e);
        await this.create({ ...cartItem, unit_price: product.price });
        return valuesString.UPDATED;
      }
      throw e;
    }
  }
}
