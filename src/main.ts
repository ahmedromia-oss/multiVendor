import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { GraphQLResponseExceptionFilter } from 'shared/filters/exceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GraphQLResponseExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // <-- important! enables proper DTO conversion
      transformOptions: {
        enableImplicitConversion: true, // optional: converts string -> number, etc
      },
      whitelist: true,
      exceptionFactory(errors: ValidationError[]) {
        return new BadRequestException(errors);
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
