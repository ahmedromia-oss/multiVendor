import { BaseService } from "shared/Services/BaseService";
import { Vendor } from "./vendor.model";
import { Inject, Injectable } from "@nestjs/common";
import { IVendorRepository } from "Interfaces/IRepositories/IVendorRepository";
import { REPOSITORY_TOKENS } from "shared/constants";

@Injectable()
export class VendorService extends BaseService<Vendor> implements IVendorRepository {
  constructor(
    @Inject(REPOSITORY_TOKENS.IVendorRepository) private readonly vendorRepository: IVendorRepository,
  ) {
    super(vendorRepository);
  }
}
