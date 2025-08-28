import { Payment } from 'src/Payment/models/Payment.model';
import { IBaseService } from './IBaseService';
import { PaymentSession } from 'src/Payment/models/PaymentSession.model';

export interface IPaymentService extends IBaseService<Payment> {
  createSession(paymentSession: PaymentSession): Promise<String>;
}
