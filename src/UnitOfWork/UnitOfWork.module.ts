import { Global, Module } from '@nestjs/common';
import { UnitOfWork } from './UnitOfWork.service';
import { SERVICE_TOKENS } from 'shared/constants';

@Global()
@Module({
  providers: [
    {
      provide: SERVICE_TOKENS.IUnitOfWork,
      useClass: UnitOfWork,
    },
  ],
  exports: [
    {
      provide: SERVICE_TOKENS.IUnitOfWork,
      useClass: UnitOfWork,
    },
  ],
})
export class UnitOfWorkModule {}
