import { Inject } from "@nestjs/common";
import { IPaymentService } from "Interfaces/IServices/IPaymentService";
import { SERVICE_TOKENS } from "shared/constants";

export class PaymentResolver{
    constructor(@Inject(SERVICE_TOKENS.IPaymentService) private readonly paymentService:IPaymentService){}
}