// src/users/user.module.ts

import { Module } from '@nestjs/common';
import { SERVICE_TOKENS } from 'shared/constants';
import { StripeService } from './stripe.service';

@Module({
  imports: [],
  providers: [
    {
      provide: SERVICE_TOKENS.IStripeService,
      useClass: StripeService,
    },
  ],
  exports: [
    { provide: SERVICE_TOKENS.IStripeService, useClass: StripeService }, // so other modules can use it
  ],
})
export class StripeModule {}
