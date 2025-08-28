import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'shared/BaseRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentSession } from '../models/PaymentSession.model';
import { IPaymentRepository } from 'Interfaces/IRepositories/IPaymentRepository';
import { IPaymentSessionRepository } from 'Interfaces/IRepositories/IPaymentSessionRepository';

@Injectable()
export class PaymentSessionRepository
  extends BaseRepository<PaymentSession>
  implements IPaymentSessionRepository
{
  constructor(
    @InjectRepository(PaymentSession)
    repository: Repository<PaymentSession>,
  ) {
    super(repository);
  }
}
