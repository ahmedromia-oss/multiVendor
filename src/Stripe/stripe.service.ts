import { Injectable, BadRequestException } from '@nestjs/common';
import { IStripeService } from 'Interfaces/IServices/IStripeService';
import Stripe from 'stripe';
import { CreatePaymentIntentDTO } from './DTOs/CreatePaymentIntent.dto';
import {
  CreateCheckoutSessionDTO,
  CreateCheckoutSessionLineItem,
} from './DTOs/CreateCheckoutSession.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StripeService implements IStripeService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get<string>('StripeKey')!, {
      apiVersion: '2025-07-30.basil',
      typescript: true,
    });
  }

  // Customers
  async createCustomer(data: {
    email?: string;
    name?: string;
    metadata?: Record<string, string>;
  }) {
    try {
      return await this.stripe.customers.create({
        email: data.email,
        name: data.name,
        metadata: data.metadata,
      });
    } catch (err: any) {
      throw new BadRequestException('Stripe createCustomer failed');
    }
  }

  async retrieveCustomer(customerId: string) {
    try {
      return (await this.stripe.customers.retrieve(
        customerId,
      )) as Stripe.Customer;
    } catch (err: any) {
      if (err?.statusCode === 404) return null;
      throw new BadRequestException('Stripe retrieveCustomer failed');
    }
  }

  async updateCustomer(
    customerId: string,
    updates: Partial<Stripe.CustomerUpdateParams>,
  ) {
    try {
      return await this.stripe.customers.update(customerId, updates);
    } catch (err: any) {
      throw new BadRequestException('Stripe updateCustomer failed');
    }
  }

  // Payment Intents
  async createPaymentIntent(dto: CreatePaymentIntentDTO) {
    try {
      return await this.stripe.paymentIntents.create({
        amount: dto.amount,
        currency: dto.currency ?? 'usd',
        customer: dto.customerId,
        metadata: dto.metadata,
        capture_method: dto.captureMethod ?? 'automatic',
        description: dto.description,
      });
    } catch (err: any) {
      throw new BadRequestException('Stripe createPaymentIntent failed');
    }
  }

  async retrievePaymentIntent(paymentIntentId: string) {
    try {
      return await this.stripe.paymentIntents.retrieve(paymentIntentId);
    } catch (err: any) {
      throw new BadRequestException('Stripe retrievePaymentIntent failed');
    }
  }

  async confirmPaymentIntent(
    paymentIntentId: string,
    options?: Stripe.PaymentIntentConfirmParams,
  ) {
    try {
      return await this.stripe.paymentIntents.confirm(paymentIntentId, options);
    } catch (err: any) {
      throw new BadRequestException('Stripe confirmPaymentIntent failed');
    }
  }

  async capturePaymentIntent(
    paymentIntentId: string,
    amountToCapture?: number,
  ) {
    try {
      return await this.stripe.paymentIntents.capture(
        paymentIntentId,
        amountToCapture ? { amount_to_capture: amountToCapture } : {},
      );
    } catch (err: any) {
      throw new BadRequestException('Stripe capturePaymentIntent failed');
    }
  }

  async cancelPaymentIntent(
    paymentIntentId: string,
    params?: Stripe.PaymentIntentCancelParams,
  ) {
    try {
      return await this.stripe.paymentIntents.cancel(paymentIntentId, params);
    } catch (err: any) {
      throw new BadRequestException('Stripe cancelPaymentIntent failed');
    }
  }

  // Checkout
  private transformLineItems(lineItems: CreateCheckoutSessionLineItem[]) {
    return lineItems.map((li) => {
      if (li.price) {
        return { price: li.price, quantity: li.quantity };
      }
      if (li.priceData) {
        return {
          price_data: {
            currency: li.priceData.currency,
            product_data: li.priceData.productData,
            unit_amount: li.priceData.unitAmount,
          },
          quantity: li.quantity,
        };
      }
      throw new Error('Each line item must include either price or priceData');
    });
  }

  async createCheckoutSession(dto: CreateCheckoutSessionDTO) {
    try {
      const session = await this.stripe.checkout.sessions.create({
        mode: dto.mode ?? 'payment',
        line_items: this.transformLineItems(dto.lineItems),
        success_url: dto.successUrl,
        cancel_url: dto.cancelUrl,
        customer: dto.customerId,
        metadata: dto.metadata,
        allow_promotion_codes: !!dto.allowPromotionCodes,
      });
      return session;
    } catch (err: any) {
      throw new BadRequestException('Stripe createCheckoutSession failed');
    }
  }

  async retrieveCheckoutSession(sessionId: string) {
    try {
      return await this.stripe.checkout.sessions.retrieve(sessionId);
    } catch (err: any) {
      throw new BadRequestException('Stripe retrieveCheckoutSession failed');
    }
  }

  // Setup & Payment Methods
  async createSetupIntent(customerId?: string) {
    try {
      return await this.stripe.setupIntents.create({ customer: customerId });
    } catch (err: any) {
      throw new BadRequestException('Stripe createSetupIntent failed');
    }
  }

  async attachPaymentMethod(paymentMethodId: string, customerId: string) {
    try {
      const pm = await this.stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });
      // Optionally set as default on customer invoice settings:
      await this.stripe.customers.update(customerId, {
        invoice_settings: { default_payment_method: pm.id },
      });
      return pm;
    } catch (err: any) {
      throw new BadRequestException('Stripe attachPaymentMethod failed');
    }
  }

  async detachPaymentMethod(paymentMethodId: string) {
    try {
      return await this.stripe.paymentMethods.detach(paymentMethodId);
    } catch (err: any) {
      throw new BadRequestException('Stripe detachPaymentMethod failed');
    }
  }

  async listPaymentMethods(customerId: string) {
    try {
      return await this.stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
      });
    } catch (err: any) {
      throw new BadRequestException('Stripe listPaymentMethods failed');
    }
  }

  // Refunds
  async createRefund(
    paymentIntentId?: string,
    chargeId?: string,
    amount?: number,
    reason?: Stripe.RefundCreateParams.Reason,
  ) {
    try {
      const params: Stripe.RefundCreateParams = {};
      if (paymentIntentId) params.payment_intent = paymentIntentId;
      if (chargeId) params.charge = chargeId;
      if (amount) params.amount = amount;
      if (reason) params.reason = reason;
      return await this.stripe.refunds.create(params);
    } catch (err: any) {
      throw new BadRequestException('Stripe createRefund failed');
    }
  }

  // Webhooks
  constructWebhookEvent(
    payload: Buffer,
    sigHeader: string,
    endpointSecret: string,
  ) {
    try {
      return this.stripe.webhooks.constructEvent(
        payload,
        sigHeader,
        endpointSecret,
      );
    } catch (err: any) {
      // let caller handle it (signature mismatch etc.)
      throw err;
    }
  }
}
