import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'shared/BaseRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../models/Payment.model';
import { IPaymentRepository } from 'Interfaces/IRepositories/IPaymentRepository';

@Injectable()
export class PaymentRepository
  extends BaseRepository<Payment>
  implements IPaymentRepository
{
  constructor(
    @InjectRepository(Payment)
    repository: Repository<Payment>,
  ) {
    super(repository);
  }
}
