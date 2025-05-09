// src/main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory }    from '@nestjs/core';
import { AppModule }      from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,       // elimina propiedades no definidas en el DTO
    transform: true,       // convierte payloads a instancias de clases
    forbidNonWhitelisted: true,  // arroja error si llegan props no en el DTO
  }));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

