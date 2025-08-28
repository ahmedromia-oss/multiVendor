import { CreateCheckoutSessionDTO } from "src/Stripe/DTOs/CreateCheckoutSession.dto";
import { CreatePaymentIntentDTO } from "src/Stripe/DTOs/CreatePaymentIntent.dto";
import Stripe from "stripe";

export interface IStripeService {
  // Customers
  createCustomer(data: { email?: string; name?: string; metadata?: Record<string,string> }): Promise<Stripe.Customer>;
  retrieveCustomer(customerId: string): Promise<Stripe.Customer | null>;
  updateCustomer(customerId: string, updates: Partial<Stripe.CustomerUpdateParams>): Promise<Stripe.Customer>;

  // Payment Intents
  createPaymentIntent(dto: CreatePaymentIntentDTO): Promise<Stripe.PaymentIntent>;
  retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent>;
  confirmPaymentIntent(paymentIntentId: string, options?: Stripe.PaymentIntentConfirmParams): Promise<Stripe.PaymentIntent>;
  capturePaymentIntent(paymentIntentId: string, amountToCapture?: number): Promise<Stripe.PaymentIntent>;
  cancelPaymentIntent(paymentIntentId: string, params?: Stripe.PaymentIntentCancelParams): Promise<Stripe.PaymentIntent>;

  // Checkout
  createCheckoutSession(dto: CreateCheckoutSessionDTO): Promise<Stripe.Checkout.Session>;
  retrieveCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session>;

  // Setup / Payment Methods
  createSetupIntent(customerId?: string): Promise<Stripe.SetupIntent>;
  attachPaymentMethod(paymentMethodId: string, customerId: string): Promise<Stripe.PaymentMethod>;
  detachPaymentMethod(paymentMethodId: string): Promise<Stripe.PaymentMethod>;
  listPaymentMethods(customerId: string): Promise<Stripe.ApiList<Stripe.PaymentMethod>>;

  // Refunds
  createRefund(paymentIntentId?: string, chargeId?: string, amount?: number, reason?: Stripe.RefundCreateParams.Reason): Promise<Stripe.Refund>;

  // Webhooks
  constructWebhookEvent(payload: Buffer, sigHeader: string, endpointSecret: string): Stripe.Event;
}