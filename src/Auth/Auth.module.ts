// src/users/user.module.ts

import { Module } from "@nestjs/common";
import { AuthService } from "./Auth.service";
import { AuthResolver } from "./Auth.resolver";
import { UserModule } from "src/User/user.module";
import { RESOLVER_TOKENS, SERVICE_TOKENS } from "shared/constants";
import { Reflector } from "@nestjs/core";


@Module({
  imports: [UserModule],
  providers: [
    {
      provide: RESOLVER_TOKENS.IAuthResolver,
      useClass: AuthResolver,
    },
    {
      provide: SERVICE_TOKENS.IAuthService, // inject via token
      useClass: AuthService, // concrete implementation
    },
   
  ],
  exports: [],
})
export class AuthModule {}
