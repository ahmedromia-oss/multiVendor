import { BaseService } from 'shared/Services/BaseService';
import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from 'Interfaces/IServices/IUserService';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from 'Interfaces/IRepositories/IUserRepository';
import { Client } from './client.model';
import { IClientRepository } from 'Interfaces/IRepositories/IClientRepository';
import { IClientService } from 'Interfaces/IServices/IClientService';
import { REPOSITORY_TOKENS } from 'shared/constants';

@Injectable()
export class ClientService extends BaseService<Client> implements IClientService {
  constructor(
    @Inject(REPOSITORY_TOKENS.IClientRepository) private readonly clientRepository: IClientRepository,
  ) {
    super(clientRepository);
  }
}
