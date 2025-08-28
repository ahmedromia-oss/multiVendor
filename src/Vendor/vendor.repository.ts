import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


import { Repository } from 'typeorm';
import { BaseRepository } from 'shared/BaseRepository';
import { IUserRepository } from 'Interfaces/IRepositories/IUserRepository';
import { Vendor } from './vendor.model';
import { IVendorRepository } from 'Interfaces/IRepositories/IVendorRepository';

@Injectable()
export class VendorRepository extends BaseRepository<Vendor> implements IVendorRepository  {
  constructor(
    @InjectRepository(Vendor)
    repository: Repository<Vendor>,
  ) {
    super(repository);
  }
}