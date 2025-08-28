import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "./client.model";
import { ClientResolver } from "./cleint.resolver";
import { ClientService } from "./client.service";
import { ClientRepository } from "./client.repository";
import { REPOSITORY_TOKENS, SERVICE_TOKENS } from "shared/constants";
import { FollowModule } from "src/ClientVendorFollow/Follow.module";


@Module({
  imports: [TypeOrmModule.forFeature([Client]) , FollowModule],
  providers: [
    ClientResolver,
    {
      provide: SERVICE_TOKENS.IClientService, // inject via token
      useClass: ClientService, // concrete implementation
    },
    {
      provide: REPOSITORY_TOKENS.IClientRepository,
      useClass: ClientRepository,
    },
  ],
  exports: [
    { provide: SERVICE_TOKENS.IClientService, useClass: ClientService }, // so other modules can use it
  ],
})
export class ClientModule {}
