import { BaseResolver } from 'shared/BaseResolver';
import { Order } from './order.model';
import { IOrderResolver } from 'Interfaces/IResolvers/IOrderResolver';
import { IOrderService } from 'Interfaces/IServices/IOrderService';
import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { getOrderDto } from './DTOs/getOrdre.dto';
import { updateOrderDto } from './DTOs/updateOrder.dto';
import { CurrentUser } from 'shared/Decorators/currentUser.decorator';
import { UserToken } from 'shared/models/userToken.model';
import { SERVICE_TOKENS, UserType } from 'shared/constants';
import { AuthGuard } from 'shared/Guards/auth.gaurd';
import { Roles } from 'shared/Decorators/Role.decorator';

@Injectable()
@Resolver(() => Order)
export class OrderResolver
  extends BaseResolver<Order>
  implements IOrderResolver
{
  constructor(
    @Inject(SERVICE_TOKENS.IOrderService)
    protected readonly orderService: IOrderService,
  ) {
    super(orderService);
  }
  @Mutation(() => getOrderDto, { name: 'checkout' })
  @UseGuards(AuthGuard)
  @Roles(UserType.CLIENT)
  async checkOut(
    @Args('data') data: updateOrderDto,
    @CurrentUser() user: UserToken,
  ): Promise<Order> {
    return await this.orderService.checkOut(user.sub, data);
  }
}
