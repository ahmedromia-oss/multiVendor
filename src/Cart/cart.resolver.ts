import { BaseResolver } from 'shared/BaseResolver';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, Injectable, UseGuards } from '@nestjs/common';

import { CurrentUser } from 'shared/Decorators/currentUser.decorator';
import { UserToken } from 'shared/models/userToken.model';
import { SERVICE_TOKENS, UserType } from 'shared/constants';
import { Cart } from './cart.model';
import { ICartService } from 'Interfaces/IServices/ICartService';
import { CartGetDTO } from './DTOs/getCart.dto';
import { ICartResolver } from 'Interfaces/IResolvers/ICartResolver';
import { createCartDto } from './DTOs/createCart.dto';
import { Roles } from 'shared/Decorators/Role.decorator';
import { RolesGuard } from 'shared/Guards/role.gaurd';
import { AuthGuard } from 'shared/Guards/auth.gaurd';

@Injectable()
@Resolver(() => Cart)
export class CartResolver extends BaseResolver<Cart> implements ICartResolver {
  constructor(
    @Inject(SERVICE_TOKENS.ICartService)
    protected readonly cartService: ICartService,
  ) {
    super(cartService);
  }
  @Query(() => CartGetDTO, { name: 'getCart' })
  @UseGuards(AuthGuard)
  async getCartById(
    @Args('cartId') cartId: string,
    @CurrentUser() user: UserToken,
  ): Promise<Cart> {
    return await this.cartService.findOne({
      where: { id: cartId, clientId: user.sub  },relations:{items:{product:true}}
    });
  }
  @Mutation(() => CartGetDTO, { name: 'createCart' })
  @UseGuards(AuthGuard , RolesGuard)
  @Roles(UserType.CLIENT)
  async createCart(
    @CurrentUser() user: UserToken,
  ): Promise<Cart> {
    return await this.cartService.create({clientId:user.sub});
  }
}
