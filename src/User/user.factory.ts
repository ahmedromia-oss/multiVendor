import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { SERVICE_TOKENS, UserType } from 'shared/constants';


@Injectable()
export class UserFactoryService {
  constructor(private readonly moduleRef: ModuleRef) {}

getService(userType: UserType) {
    switch (userType) {
      case UserType.CLIENT:
        return this.moduleRef.get(SERVICE_TOKENS.IClientService, { strict: false });
      case UserType.VENDOR:
        return this.moduleRef.get(SERVICE_TOKENS.IVendorService , {strict:false})
    
    }
  }
}