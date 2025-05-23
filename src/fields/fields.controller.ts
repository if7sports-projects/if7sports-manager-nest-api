// src/fields/fields.controller.ts
import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FieldsService } from './fields.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { Field as FieldModel } from './schemas/field.schema';

/**
 * Controller exposing REST endpoints for Fields
 */
@Controller('api/fields')
@UseGuards(JwtAuthGuard)  // Protect all routes with JWT
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  /**
   * POST /api/fields
   * Create a new field
   */
  @Post()
  create(@Body() dto: CreateFieldDto): Promise<FieldModel> {
    return this.fieldsService.create(dto);
  }

  /**
   * GET /api/fields
   * List all fields
   */
  @Get()
  findAll(): Promise<FieldModel[]> {
    return this.fieldsService.findAll();
  }

  /**
   * GET /api/fields/entity/:entityId
   * List fields for a specific entity
   */
  @Get('entity/:entityId')
  findByEntity(@Param('entityId') entityId: string): Promise<FieldModel[]> {
    return this.fieldsService.findByEntity(entityId);
  }

  /**
   * PATCH /api/fields/:id
   * Update an existing field
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateFieldDto,
  ): Promise<FieldModel> {
    return this.fieldsService.update(id, dto);
  }
}
