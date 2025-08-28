import { Module } from '@nestjs/common';
import { DataLoaderService } from './DataLoader.service';
import { SERVICE_TOKENS } from 'shared/constants';

@Module({
  providers: [
    {
      provide: SERVICE_TOKENS.IDataLoader,
      useClass: DataLoaderService,
    },
  ],
  exports: [
    {
      provide: SERVICE_TOKENS.IDataLoader,
      useClass: DataLoaderService,
    },
  ],
})
export class DataLoaderModule {}
