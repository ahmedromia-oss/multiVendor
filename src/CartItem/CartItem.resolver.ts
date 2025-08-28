import { BaseResolver } from 'shared/BaseResolver';
import { CartItem } from './CartItem.model';
import { ICartItemService } from 'Interfaces/IServices/ICartItemService';
import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ICartItemResolver } from 'Interfaces/IResolvers/ICartItemResolver';
import { updateCartItem } from './DTOs/updateCartItem.dto';
import { CurrentUser } from 'shared/Decorators/currentUser.decorator';
import { UserToken } from 'shared/models/userToken.model';
import { AuthGuard } from 'shared/Guards/auth.gaurd';
import { RolesGuard } from 'shared/Guards/role.gaurd';
import { Roles } from 'shared/Decorators/Role.decorator';
import { SERVICE_TOKENS, UserType } from 'shared/constants';

@Injectable()
@Resolver(() => CartItem)
export class CartItemResolver
  extends BaseResolver<CartItem>
  implements ICartItemResolver
{
  constructor(
    @Inject(SERVICE_TOKENS.ICartItemService)
    protected readonly cartItemService: ICartItemService,
  ) {
    super(cartItemService);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserType.CLIENT)
  @Mutation(() => String, { name: 'updateQuantity' })
  async updateQuantity(
    @Args('data') data: updateCartItem,
    @CurrentUser() user: UserToken,
  ): Promise<String> {
    return await this.cartItemService.updateQuantity(data, user.sub);
  }
}
