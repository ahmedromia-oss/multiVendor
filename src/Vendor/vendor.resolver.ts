
import { Inject, Injectable } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Vendor } from './vendor.model';
import { IVendorResolver } from 'Interfaces/IResolvers/IVendorResolver';
import { IVendorService } from 'Interfaces/IServices/IVendorService';
import { BaseResolver } from 'shared/BaseResolver';

import { GetVendorDto } from './DTOs/getVendor.dto';
import { UpdateVendorDto } from './DTOs/updateVendor.dto';
import { SERVICE_TOKENS } from 'shared/constants';


@Injectable()
@Resolver(() => Vendor)
export class VendorResolver extends BaseResolver<Vendor> implements IVendorResolver {
  constructor(@Inject(SERVICE_TOKENS.IVendorService) protected readonly vendorService: IVendorService) {
    super(vendorService);
  }

  // ------- Queries -------
  @Query(() => [GetVendorDto], { name: 'getVendors' })
  async findAll(take?: number, skip?: number): Promise<Vendor[]> {
    return await super.findAll(take , skip)
  }

  @Query(() =>GetVendorDto , { name: 'getVendor', nullable: true })
  async getVendorById(@Args('id', { type: () => ID }) id: string) {
    return await this.vendorService.findOne({where:{userId:id}});
  }
  // ------- Mutations -------

  @Mutation(() => String, { name: 'updateUser' })
  async updateVendor(@Args('id', { type: () => ID }) id: string, @Args('input') input: UpdateVendorDto) {
    return await super.update({userId:id}, input as any);
  }

  @Mutation(() => String, { name: 'deleteUser' })
  async deleteUser(@Args('id', { type: () => ID }) id: string) {
    return await super.delete({userId:id});
  }
}
