export class CreatePaymentIntentDTO {
  amount: number; // in the smallest currency unit (e.g. cents)
  currency?: string;
  customerId?: string;
  metadata?: Record<string, string>;
  captureMethod?: 'automatic' | 'manual';
  description?: string;
}
