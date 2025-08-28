import { BaseResolver } from 'shared/BaseResolver';
import { IProductResolver } from 'Interfaces/IResolvers/IProductResolver';
import { Product } from './product.model';
import {
  Mutation,
  Query,
  Resolver,
  Args,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { IProductService } from 'Interfaces/IServices/IProductService';

import { ProductDto } from './DTOs/getProduct.dto';
import { UpdateProductInput } from './DTOs/updateProduct.dto';
import { CreateProductInput } from './DTOs/createProduct.dto';
import { CurrentUser } from 'shared/Decorators/currentUser.decorator';
import { UserToken } from 'shared/models/userToken.model';
import { AuthGuard } from 'shared/Guards/auth.gaurd';
import { RolesGuard } from 'shared/Guards/role.gaurd';
import { Roles } from 'shared/Decorators/Role.decorator';
import { RESOLVER_TOKENS, SERVICE_TOKENS, UserType } from 'shared/constants';
import { Vendor } from 'src/Vendor/vendor.model';
import { IDataLoader } from 'Interfaces/IServices/IDataLoaderService';
import { VendorService } from 'src/Vendor/vendor.service';
import { GetVendorDto } from 'src/Vendor/DTOs/getVendor.dto';

// @Injectable()
@Resolver(() => ProductDto)
export class ProductResolver
  extends BaseResolver<Product>
  implements IProductResolver
{
  constructor(
    @Inject(SERVICE_TOKENS.IProductService)
    protected readonly productService: IProductService,
    @Inject(SERVICE_TOKENS.IDataLoader)
    private readonly dataLoader: IDataLoader,
    @Inject(SERVICE_TOKENS.IVendorService)
    private readonly vendorService: VendorService,
  ) {
    super(productService);
  }

  @Query(() => [ProductDto], { name: 'getProducts' })
  async findProducts(
    @Args('take', { nullable: true }) take?: number,
    @Args('skip', { nullable: true }) skip?: number,
  ): Promise<Product[]> {
    return await this.findAll(take, skip);
  }

  @ResolveField(() => GetVendorDto)
  async vendor(
    @Parent() product: ProductDto,
    @Context() { loaders },
  ): Promise<Vendor | null> {
    if (!loaders.vendorLoader) {
      loaders.vendorLoader = this.dataLoader.createLoader(
        this.vendorService,
        'userId',
      );
    }
    return loaders.vendorLoader.load(product.vendorId);
  }
  
  @Mutation(() => ProductDto, { name: 'createProduct' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserType.VENDOR, UserType.SUPER_ADMIN)
  async createProduct(
    @CurrentUser() user: UserToken,
    @Args('data') data: CreateProductInput,
  ): Promise<Product> {
    console.log(data);
    return await this.create({ ...data, vendorId: user.sub });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserType.VENDOR, UserType.SUPER_ADMIN)
  @Mutation(() => String, { name: 'updateProduct' })
  async updateProduct(
    @Args('data') data: UpdateProductInput,
    @CurrentUser() user: UserToken,
  ): Promise<string> {
    return await this.update({ vendorId: user.sub }, data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserType.VENDOR, UserType.SUPER_ADMIN)
  @Mutation(() => String, { name: 'DeleteProduct' })
  async DeleteProduct(
    @Args('productId') productId: string,
    @CurrentUser() user: UserToken,
  ): Promise<string> {
    return await this.delete({ vendorId: user.sub, id: productId });
  }
}
