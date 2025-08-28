import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


import { Repository } from 'typeorm';
import { User } from './user.model';
import { BaseRepository } from 'shared/BaseRepository';
import { IUserRepository } from 'Interfaces/IRepositories/IUserRepository';

@Injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository  {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository);
  }
}