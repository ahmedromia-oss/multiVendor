import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.model';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { UnitOfWork } from 'src/UnitOfWork/UnitOfWork.service';
import { VendorModule } from 'src/Vendor/vendor.module';
import { ProductResolver } from './product.resolver';
import {
  REPOSITORY_TOKENS,
  RESOLVER_TOKENS,
  SERVICE_TOKENS,
} from 'shared/constants';
import { DataLoaderModule } from 'src/DataLoader/DataLoader.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), VendorModule , DataLoaderModule],
  providers: [
    ProductResolver,
    {
      provide: SERVICE_TOKENS.IProductService,
      useClass: ProductService,
    },
    {
      provide: REPOSITORY_TOKENS.IProductRepository,
      useClass: ProductRepository,
    },
  ],
  exports: [
    { provide: SERVICE_TOKENS.IProductService, useClass: ProductService },
   
  ],
})
export class ProductModule {}
