import { Injectable } from "@nestjs/common";
import { ClientVendorFollow } from "./Follow.model";
import { BaseRepository } from "shared/BaseRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IFollowRepository } from "Interfaces/IRepositories/IFollowRepository";


@Injectable()
export class FollowRepository extends BaseRepository<ClientVendorFollow> implements IFollowRepository   {
  constructor(
    @InjectRepository(ClientVendorFollow)
    repository: Repository<ClientVendorFollow>,
  ) {
    super(repository);
  }
}