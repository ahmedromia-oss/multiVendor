import { Injectable } from '@nestjs/common';
import { CartItem } from './CartItem.model';
import { BaseRepository } from 'shared/BaseRepository';
import { ICartItemRepository } from 'Interfaces/IRepositories/ICartItemRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CartItemRepository
  extends BaseRepository<CartItem>
  implements ICartItemRepository
{
  constructor(
    @InjectRepository(CartItem)
    repository: Repository<CartItem>,
  ) {
    super(repository);
  }
}
