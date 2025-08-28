import { BaseService } from 'shared/Services/BaseService';
import { User } from './user.model';
import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from 'Interfaces/IServices/IUserService';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, EntityManager, Repository } from 'typeorm';
import { IUserRepository } from 'Interfaces/IRepositories/IUserRepository';
import { UserFactoryService } from './user.factory';
import { IUnitOfWork } from 'Interfaces/IServices/IUnitOfWrokService';
import { REPOSITORY_TOKENS, SERVICE_TOKENS } from 'shared/constants';

@Injectable()
export class UserService extends BaseService<User> implements IUserService {
  constructor(
    @Inject(REPOSITORY_TOKENS.IUserRepository) private readonly userRepository: IUserRepository,
    private readonly userFactory: UserFactoryService,
    @Inject(SERVICE_TOKENS.IUnitOfWork) private readonly uow:IUnitOfWork
  ) {
    super(userRepository);
  }

  override async create(
    data: DeepPartial<User>,
    manager?: EntityManager,
  ): Promise<User> {
    if (manager) {
      if (manager) {
        const user = await this.userRepository.create(data, manager);
        const service = this.userFactory.getService(data.userType!);
        await service!.create({ userId: user.id }, manager);
        return user;
      }
    }
    return await this.uow.execute(async (manager: EntityManager) => {
      const user = await this.userRepository.create(data, manager);
      const service = this.userFactory.getService(data.userType!);
      await service!.create({ userId: user.id }, manager);
      return user;
    });
  }
}
