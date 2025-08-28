import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


import { Repository } from 'typeorm';
import { BaseRepository } from 'shared/BaseRepository';
import { IUserRepository } from 'Interfaces/IRepositories/IUserRepository';
import { IClientRepository } from 'Interfaces/IRepositories/IClientRepository';
import { Cart } from './cart.model';
import { ICartRepository } from 'Interfaces/IRepositories/ICartRepository';

@Injectable()
export class CartRepository extends BaseRepository<Cart> implements ICartRepository  {
  constructor(
    @InjectRepository(Cart)
    repository: Repository<Cart>
  ) {
    super(repository);
  }
}