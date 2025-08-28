// src/users/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UnitOfWork } from 'src/UnitOfWork/UnitOfWork.service';
import { ClientModule } from 'src/Client/client.module';
import { VendorModule } from 'src/Vendor/vendor.module';
import { UserFactoryService } from './user.factory';
import { AuthModule } from 'src/Auth/Auth.module';
import { REPOSITORY_TOKENS, RESOLVER_TOKENS, SERVICE_TOKENS } from 'shared/constants';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User]) , ClientModule , VendorModule ],
  providers: [
    UserFactoryService,
    {
      provide: RESOLVER_TOKENS.IUserResolver,
      useClass: UserResolver,
    },
    {
      provide: SERVICE_TOKENS.IUserService, 
      useClass: UserService, 
    },
    {
      provide: REPOSITORY_TOKENS.IUserRepository,
      useClass: UserRepository,
    },
   
  ],
  exports: [
    { provide: SERVICE_TOKENS.IUserService, useClass: UserService }, // so other modules can use it
  ],
})
export class UserModule {}
