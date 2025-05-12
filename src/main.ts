// src/main.ts

import { ValidationPipe }        from '@nestjs/common';
import { NestFactory }           from '@nestjs/core';
import { AppModule }             from './app.module';
import { AllExceptionsFilter }   from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1) ValidationPipe (tus DTOs)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  // 2) Exception filter global
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();


