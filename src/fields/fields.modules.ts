// src/fields/fields.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FieldsService } from './fields.service';
import { FieldsController } from './fields.controller';
import { Field, FieldSchema } from './schemas/field.schema';

/**
 * Module encapsulating Fields feature
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Field.name, schema: FieldSchema }]),
  ],
  providers: [FieldsService],
  controllers: [FieldsController],
  exports: [FieldsService],
})
export class FieldsModule {}