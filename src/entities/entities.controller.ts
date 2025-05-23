// src/entities/entities.controller.ts

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { Entity as EntityModel } from './schemas/entity.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/entities')
export class EntitiesController {
  constructor(
    private readonly entitiesService: EntitiesService
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createEntityDto: CreateEntityDto
  ): Promise<EntityModel> {
    return this.entitiesService.create(createEntityDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<EntityModel[]> {
    return this.entitiesService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEntityDto: UpdateEntityDto
  ): Promise<EntityModel> {
    return this.entitiesService.update(id, updateEntityDto);
  }
}


