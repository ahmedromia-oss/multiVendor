// src/users/user.module.ts

import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './vendor.model';
import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorRepository } from './vendor.repository';
import { VendorResolver } from './vendor.resolver';
import {
  REPOSITORY_TOKENS,
  SERVICE_TOKENS,
} from 'shared/constants';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor])],
  providers: [
    VendorResolver,
    {
      provide: SERVICE_TOKENS.IVendorService, // inject via token
      useClass: VendorService, // concrete implementation
    },
    {
      provide: REPOSITORY_TOKENS.IVendorRepository,
      useClass: VendorRepository,
    },
  ],
  exports: [
    { provide: SERVICE_TOKENS.IVendorService, useClass: VendorService }, // so other modules can use it
  ],
})
export class VendorModule {}
