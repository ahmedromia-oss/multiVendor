import { BaseService } from 'shared/Services/BaseService';
import { ICartService } from 'Interfaces/IServices/ICartService';
import { Cart } from './cart.model';
import { Inject } from '@nestjs/common';
import { ICartRepository } from 'Interfaces/IRepositories/ICartRepository';
import { DeepPartial, EntityManager } from 'typeorm';
import { CartStatus, REPOSITORY_TOKENS, SERVICE_TOKENS } from 'shared/constants';

export class CartService extends BaseService<Cart> implements ICartService {
  constructor(
    @Inject(REPOSITORY_TOKENS.ICartRepository) private readonly cartRepository: ICartRepository,
  ) {
    super(cartRepository);
  }
  override async create(
    data: DeepPartial<Cart>,
    manager?: EntityManager,
  ): Promise<Cart> {
    try {
      return await this.cartRepository.findOne({
        where: { clientId: data.clientId, status: CartStatus.ACTIVE  || CartStatus.ABANDONED},
      });
    } catch {
      return await super.create(data, manager);
    }
  }
}
