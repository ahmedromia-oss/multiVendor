import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from 'shared/Services/BaseService';
import { Payment } from './models/Payment.model';
import { IPaymentService } from 'Interfaces/IServices/IPaymentService';
import { IPaymentRepository } from 'Interfaces/IRepositories/IPaymentRepository';
import {
  CartStatus,
  PaymentStatus,
  REPOSITORY_TOKENS,
  SERVICE_TOKENS,
} from 'shared/constants';
import { IPaymentSessionRepository } from 'Interfaces/IRepositories/IPaymentSessionRepository';
import { PaymentSession } from './models/PaymentSession.model';
import { ICartService } from 'Interfaces/IServices/ICartService';
import { IStripeService } from 'Interfaces/IServices/IStripeService';
import { UserToken } from 'shared/models/userToken.model';

@Injectable()
export class PaymentService
  extends BaseService<Payment>
  implements IPaymentService
{
  constructor(
    @Inject(REPOSITORY_TOKENS.IPaymentRepository)
    private readonly paymentRepository: IPaymentRepository,
    @Inject(REPOSITORY_TOKENS.IPaymentSessionRepository)
    private readonly paymentSessionRepository: IPaymentSessionRepository,
    @Inject(SERVICE_TOKENS.ICartService)
    private readonly cartService: ICartService,
    @Inject(SERVICE_TOKENS.IStripeService)
    private readonly stripeService: IStripeService,
  ) {
    super(paymentRepository);
  }
  async createSession(paymentSession: PaymentSession): Promise<String> {
    const cart = await this.cartService.findOne({
      where: { id: paymentSession.cartId, status: CartStatus.ACTIVE },
    });

    if (
      await this.paymentSessionRepository.checkIFExists({
        where: { cartId: paymentSession.cartId },
      })
    ) {
      return await this.paymentSessionRepository.update(
        { cartId: paymentSession.cartId },
        paymentSession,
      );
    } else {
      await this.paymentSessionRepository.create(paymentSession);
      return 'CREATED';
    }
  }
  async createPayment(user: UserToken, payment: Payment) {
    try {
      // Create Stripe payment intent

      const stripe = await this.stripeService.createPaymentIntent({
        customerId: user.sub,
        amount: payment.amount,
        currency: payment.currency,
      });
      await this.paymentRepository.create({
        ...payment,
        paymentIntentId: stripe.id,
      });
    } catch {}
  }

  async confirmPayment(user: UserToken, payment: Payment) {
    // Verify user owns the payment

    // Confirm payment with Stripe
    await this.stripeService.confirmPaymentIntent(payment.paymentIntentId);

    // Update local database record
    const updatedPayment = await this.paymentRepository.update(
      {
        paymentIntentId: payment.paymentIntentId,
      },
      {
        status: PaymentStatus.COMPLETED,
      },
    );

    if (!updatedPayment) {
      throw new NotFoundException('Payment not found in database');
    }

    return payment;
  }
}

// Utility method to sync payment status from Stripe

// Cleanup method for failed payments

// Example: Check if CUID exists in your system
// const exists = await this.someService.checkCuidExists(cuid);
// if (!exists) {
//   throw new NotFoundException('CUID not found');
// }
