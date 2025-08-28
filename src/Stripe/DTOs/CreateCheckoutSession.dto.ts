export interface CreateCheckoutSessionLineItem {
  priceData?: {
    currency: string;
    productData?: { name: string; description?: string; metadata?: Record<string,string> };
    unitAmount: number;
  };
  price?: string; // use an existing price id OR priceData
  quantity: number;
}

export interface CreateCheckoutSessionDTO {
  lineItems: CreateCheckoutSessionLineItem[];
  successUrl: string;
  cancelUrl: string;
  customerId?: string;
  mode?: 'payment' | 'subscription' | 'setup';
  metadata?: Record<string, string>;
  allowPromotionCodes?: boolean;
}