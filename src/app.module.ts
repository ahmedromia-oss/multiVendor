// src/app.module.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './User/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './dataSource';
import { JwtModule } from '@nestjs/jwt';
import { VendorModule } from './Vendor/vendor.module';
import { ClientModule } from './Client/client.module';
import { AuthModule } from './Auth/Auth.module';
import { CartModule } from './Cart/cart.module';
import { CartItemModule } from './CartItem/CartItem.module';
import { OrderModule } from './Order/order.module';
import { UnitOfWorkModule } from './UnitOfWork/UnitOfWork.module';
import { ProductModule } from './Product/product.module';
import { FollowModule } from './ClientVendorFollow/Follow.module';

import { BullModule } from '@nestjs/bull';
import * as dotenv from 'dotenv';
import { MailModule } from './Mail/Mail.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DataLoaderModule } from './DataLoader/DataLoader.module';

dotenv.config();

@Module({
  imports: [
    DataLoaderModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),
          password: configService.get('REDIS_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),

    MailModule,

    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners are assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
    MailModule,

   
    FollowModule,
    ProductModule,
    UnitOfWorkModule,
    OrderModule,
    CartModule,
    CartModule,
    CartItemModule,
    AuthModule,
    ClientModule,
    JwtModule.register({ global: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    VendorModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
    
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // sortSchema: true,
      playground: true,
      context: ({ req, res, extra }) => ({ req,loaders:{} , res , extra }),

      debug: true,
      formatError: (err) => {
        // Check if it's a validation error
        if (err.extensions?.code === 'BAD_INPUT') {
          return {
            message: err.message,
            code: err.extensions.code,
            errors: err.extensions.errors,
          };
        }

        // Return default format for other errors
        return {
          message: err.message,
          code: err.extensions?.code,
        };
      },
    }),

    TypeOrmModule.forRoot({ ...AppDataSource.options, autoLoadEntities: true }),
  ],
})
export class AppModule {}
