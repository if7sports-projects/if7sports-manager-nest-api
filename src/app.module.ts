// src/app.module.ts
/**
 * @module AppModule
 * @description Módulo raíz que importa módulos de configuración, conexión a MongoDB y los feature modules
 */
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware }                      from './common/middleware/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EntitiesModule } from './entities/entities.module';
import { AuthModule } from './auth/auth.module';
import { FieldsModule } from './fields/fields.modules';
import { BookingsModule } from './bookings/bookings.module';
import { AvailabilityModule } from './availability/availability.module';

@Module({
  imports: [
    // Carga de variables de entorno de manera global
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    // Conexión a MongoDB de forma asíncrona usando ConfigService
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
        // opcionales:
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    // Feature modules de la aplicación
    UsersModule,
    EntitiesModule,
    AuthModule,
    FieldsModule,
    BookingsModule,
    AvailabilityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');  // todas las rutas
  }
}
