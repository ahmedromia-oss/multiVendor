import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { REPOSITORY_TOKENS, SERVICE_TOKENS } from 'shared/constants';
import { FollowService } from './Follow.service';
import { FollowRepository } from './Follow.repository';
import { ClientVendorFollow } from './Follow.model';
import { VendorModule } from 'src/Vendor/vendor.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClientVendorFollow]) , VendorModule],
  providers: [
    {
      provide: SERVICE_TOKENS.IFollowService, // inject via token
      useClass: FollowService, // concrete implementation
    },
    {
      provide: REPOSITORY_TOKENS.IFollowRepository,
      useClass: FollowRepository,
    },
  ],
  exports: [
    { provide: SERVICE_TOKENS.IFollowService, useClass: FollowService }, // so other modules can use it
  ],
})
export class FollowModule {}
