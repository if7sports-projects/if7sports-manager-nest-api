import { Body, Controller, Get, Post } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { Entity as EntityModel } from './schemas/entity.schema';

@Controller('api/entities')
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Post()
  create(@Body() createEntityDto: Partial<EntityModel>): Promise<EntityModel> {
    return this.entitiesService.create(createEntityDto);
  }

  @Get()
  findAll(): Promise<EntityModel[]> {
    return this.entitiesService.findAll();
  }
}
