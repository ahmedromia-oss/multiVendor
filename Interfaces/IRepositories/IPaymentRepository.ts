import { BaseRepository } from "shared/BaseRepository";
import { Payment } from "src/Payment/models/Payment.model";

export interface IPaymentRepository extends BaseRepository<Payment>{}