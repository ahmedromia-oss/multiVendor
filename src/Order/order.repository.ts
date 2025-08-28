import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'shared/BaseRepository';
import { Order } from './order.model';
import { IOrderRepository } from 'Interfaces/IRepositories/IOrderRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class OrderRepository extends BaseRepository<Order> implements IOrderRepository  {
  constructor(
    @InjectRepository(Order)
    repository: Repository<Order>
  ) {
    super(repository);
  }
}