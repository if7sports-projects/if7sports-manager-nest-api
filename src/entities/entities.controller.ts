// src/entities/entities.controller.ts

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { Entity as EntityModel } from './schemas/entity.schema';

@Controller('api/entities')
export class EntitiesController {
  constructor(
    private readonly entitiesService: EntitiesService
  ) {}

  @Post()
  create(
    @Body() createEntityDto: CreateEntityDto
  ): Promise<EntityModel> {
    return this.entitiesService.create(createEntityDto);
  }

  @Get()
  findAll(): Promise<EntityModel[]> {
    return this.entitiesService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEntityDto: UpdateEntityDto
  ): Promise<EntityModel> {
    return this.entitiesService.update(id, updateEntityDto);
  }
}


