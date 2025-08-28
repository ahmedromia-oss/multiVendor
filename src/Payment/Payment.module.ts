import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { REPOSITORY_TOKENS, SERVICE_TOKENS } from 'shared/constants';
import { PaymentService } from './Payment.service';
import { Payment } from './models/Payment.model';
import { PaymentRepository } from './Repositories/PaymentRepository';
import { PaymentSessionRepository } from './Repositories/PaymentSessionRepository';
import { PaymentSession } from './models/PaymentSession.model';
import { PaymentResolver } from './payment.resolver';
import { CartModule } from 'src/Cart/cart.module';
import { StripeModule } from 'src/Stripe/stripe.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, PaymentSession]) ,CartModule , StripeModule],
  providers: [
    PaymentResolver,
    {
      provide: SERVICE_TOKENS.IPaymentService, // inject via token
      useClass: PaymentService, // concrete implementation
    },
    {
      provide: REPOSITORY_TOKENS.IPaymentRepository,
      useClass: PaymentRepository,
    },
    {
      provide: REPOSITORY_TOKENS.IPaymentSessionRepository,
      useClass: PaymentSessionRepository,
    },
  ],
  exports: [
    { provide: SERVICE_TOKENS.IPaymentService, useClass: PaymentService }, // so other modules can use it
  ],
})
export class PaymentModule {}
