import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


import { Repository } from 'typeorm';
import { BaseRepository } from 'shared/BaseRepository';
import { IUserRepository } from 'Interfaces/IRepositories/IUserRepository';
import { Client } from './client.model';
import { IClientRepository } from 'Interfaces/IRepositories/IClientRepository';

@Injectable()
export class ClientRepository extends BaseRepository<Client> implements IClientRepository  {
  constructor(
    @InjectRepository(Client)
    repository: Repository<Client>
  ) {
    super(repository);
  }
}