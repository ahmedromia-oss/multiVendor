// src/user/user.resolver.ts
import { Resolver, Query, Args, ID, Mutation, Int } from '@nestjs/graphql';
import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { BaseResolver } from 'shared/BaseResolver';
import { User } from './user.model';
import { CreateUserDto } from './DTOs/createUser.dto';
import { UpdateUserDto } from './DTOs/updateUser.dto';
import { GetUserDto } from './DTOs/getUser.dto';
import { IUserService } from 'Interfaces/IServices/IUserService';
import { IUserResolver } from 'Interfaces/IResolvers/IUserResolver';
import { CurrentUser } from 'shared/Decorators/currentUser.decorator';
import { UserToken } from 'shared/models/userToken.model';
import { RolesGuard } from 'shared/Guards/role.gaurd';
import { Roles } from 'shared/Decorators/Role.decorator';
import { SERVICE_TOKENS, UserType } from 'shared/constants';
import { AuthGuard } from 'shared/Guards/auth.gaurd';
@Injectable()
@Resolver(() => User)
export class UserResolver extends BaseResolver<User> implements IUserResolver {
  constructor(
    @Inject(SERVICE_TOKENS.IUserService)
    protected readonly userService: IUserService,
  ) {
    super(userService);
  }

  // ------- Queries -------

  @Query(() => [GetUserDto], { name: 'getUsers' })
  @UseGuards(AuthGuard)
  async findUsers(
    @CurrentUser() user: UserToken,
    take?: number,
    skip?: number,
  ): Promise<User[]> {
    return await this.userService.findAll({ take, skip });
  }

  @Query(() => GetUserDto, { name: 'getUser', nullable: true })
  async getUser(@Args('id', { type: () => ID }) id: string) {
    return await this.findById(id);
  }

  @Query(() => GetUserDto, { name: 'findOneUser', nullable: true })
  async findOneUser(
    @Args('field') field: string,
    @Args('value') value: string,
  ) {
    return await this.findOneBy(field, value);
  }

  // ------- Mutations -------
  @Mutation(() => GetUserDto, { name: 'createUser' })
  async createUser(@Args('input') input: CreateUserDto) {
    return await this.create(input);
  }

  @Mutation(() => String, { name: 'updateUser' })
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUserDto,
  ) {
    return await this.update({ id: id }, input as any);
  }

  @Mutation(() => String, { name: 'deleteUser' })
  async deleteUser(@Args('id', { type: () => ID }) id: string) {
    return await this.delete({ id: id });
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserType.SUPER_ADMIN)
  @Mutation(() => String, { name: 'ApproveUser' })
  async approveUser(@Args('id') id: string): Promise<String> {
    return await this.userService.update({ id: id }, { isApproved: true });
  }
}
