import { GetClientDto } from './DTOs/getclient.dto';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Client } from './client.model';
import { BaseResolver } from 'shared/BaseResolver';
import { ClientService } from './client.service';
import { UpdateClientDto } from './DTOs/updateClient.dto';
import { IClientResolver } from 'Interfaces/IResolvers/IClientResolver';
import { Inject, UseGuards } from '@nestjs/common';
import { IClientService } from 'Interfaces/IServices/IClientService';
import { SERVICE_TOKENS, UserType } from 'shared/constants';
import { IFollowService } from 'Interfaces/IServices/IFollowService';
import { AuthGuard } from 'shared/Guards/auth.gaurd';
import { Roles } from 'shared/Decorators/Role.decorator';
import { CurrentUser } from 'shared/Decorators/currentUser.decorator';
import { UserToken } from 'shared/models/userToken.model';
import { RolesGuard } from 'shared/Guards/role.gaurd';

@Resolver(() => Client)
export class ClientResolver
  extends BaseResolver<Client>
  implements IClientResolver
{
  constructor(
    @Inject(SERVICE_TOKENS.IClientService)
    private readonly clientService: IClientService,
    @Inject(SERVICE_TOKENS.IFollowService)
    private readonly followService: IFollowService,
    
  ) {
    super(clientService);
  }

  /** find client by id */
  @Query(() => GetClientDto, { nullable: true })
  async getclientById(
    @Args('userId', { type: () => ID }) userId: string,
  ): Promise<Client> {
    return await this.clientService.findOne({ where: { userId: userId } });
  }

  /** update client */
  @Mutation(() => String)
  async updateClient(
    @Args('userId') userId: string,
    @Args('data') data: UpdateClientDto,
  ): Promise<string> {
    return await this.update({ userId }, data);
  }
  @Mutation(() => String , {name:'follow'})
  @UseGuards(AuthGuard , RolesGuard)
  @Roles(UserType.CLIENT)
  async followUnFollow(
    @Args('vendorId') vendorId: string,
    @CurrentUser() user: UserToken,
  ):Promise<String> {
    return await this.followService.followUnFollow(vendorId , user.sub)
  }
}
