import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entity, EntityDocument } from './schemas/entity.schema';

@Injectable()
export class EntitiesService {
  constructor(
    @InjectModel(Entity.name) private entityModel: Model<EntityDocument>,
  ) {}

  create(createDto: Partial<Entity>): Promise<Entity> {
    const created = new this.entityModel(createDto);
    return created.save();
  }

  findAll(): Promise<Entity[]> {
    return this.entityModel.find().exec();
  }
}
