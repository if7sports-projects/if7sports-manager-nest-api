// src/entities/entities.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel }              from '@nestjs/mongoose';
import { Model, Types }             from 'mongoose';
import { Entity, EntityDocument }   from './schemas/entity.schema';
import { CreateEntityDto }          from './dto/create-entity.dto';
import { UpdateEntityDto }          from './dto/update-entity.dto';

@Injectable()
export class EntitiesService {
  constructor(
    @InjectModel(Entity.name)
    private readonly entityModel: Model<EntityDocument>
  ) {}

  async create(dto: CreateEntityDto): Promise<EntityDocument> {
    const { organizerId, staff, ...rest } = dto;
    const payload: Partial<Entity> = {
      ...rest,
      organizerId: new Types.ObjectId(organizerId),
      ...(staff
        ? { staff: staff.map(id => new Types.ObjectId(id)) }
        : {}),
    };
    const created = new this.entityModel(payload);
    return created.save();
  }

  async findAll(): Promise<EntityDocument[]> {
    return this.entityModel.find().exec();
  }

  async update(
    id: string,
    dto: UpdateEntityDto
  ): Promise<EntityDocument> {
    const { organizerId, staff, ...rest } = dto;
    const payload: Partial<Entity> = {
      ...rest,
      ...(organizerId
        ? { organizerId: new Types.ObjectId(organizerId) }
        : {}),
      ...(staff
        ? { staff: staff.map(id => new Types.ObjectId(id)) }
        : {}),
    };

    const updated = await this.entityModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Entity con id ${id} no encontrada`);
    }
    return updated;
  }
}

