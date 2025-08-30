import { IProductRepository } from 'Interfaces/IRepositories/IProductRepository';
import { Product } from './product.model';
import { IProductService } from 'Interfaces/IServices/IProductService';
import { BaseService } from 'shared/Services/BaseService';
import { Inject, Injectable } from '@nestjs/common';
import { DeepPartial, EntityManager } from 'typeorm';
import { privateDecrypt } from 'crypto';
import { IVendorService } from 'Interfaces/IServices/IVendorService';
import { IUnitOfWork } from 'Interfaces/IServices/IUnitOfWrokService';
import { REPOSITORY_TOKENS, SERVICE_TOKENS } from 'shared/constants';

@Injectable()
export class ProductService
  extends BaseService<Product>
  implements IProductService
{
  constructor(
    @Inject(REPOSITORY_TOKENS.IProductRepository)
    private readonly productRepository: IProductRepository,
    @Inject(SERVICE_TOKENS.IVendorService) private readonly vendorService: IVendorService,
    @Inject(SERVICE_TOKENS.IUnitOfWork) private readonly uow: IUnitOfWork,
  ) {
    super(productRepository);
  }
  override async create(
    data: DeepPartial<Product>,
    manager?: EntityManager,
  ): Promise<Product> {
    const executeCreate = async (transactionManager: EntityManager) => {
      
      await this.vendorService.findOne(
        {
          where: { userId: data.vendorId },
          lock: { mode: 'pessimistic_read' }, // Read lock is sufficient
        },
        transactionManager,
      );
      
      return await super.create(data, transactionManager);
    };

    // If manager provided, assume we're already in a transaction
    if (manager) {
      return await executeCreate(manager);
    }

    // Otherwise, create new transaction
    return await this.uow.execute(executeCreate);
  }
}
