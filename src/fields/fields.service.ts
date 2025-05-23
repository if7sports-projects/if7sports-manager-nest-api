// src/fields/fields.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Field, FieldDocument } from './schemas/field.schema';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';

/**
 * Service that handles business logic for Fields
 */
@Injectable()
export class FieldsService {
  constructor(
    @InjectModel(Field.name) private fieldModel: Model<FieldDocument>,
  ) {}

  /**
   * Create a new field
   */
  async create(dto: CreateFieldDto): Promise<FieldDocument> {
    const { entityId, ...rest } = dto;
    // Convert string to ObjectId
    const payload: Partial<Field> = {
      ...rest,
      entityId: new Types.ObjectId(entityId),
    };
    const created = new this.fieldModel(payload);
    return created.save();
  }

  /**
   * Retrieve all fields
   */
  async findAll(): Promise<FieldDocument[]> {
    return this.fieldModel.find().exec();
  }

  /**
   * Retrieve fields by parent entity
   */
  async findByEntity(entityId: string): Promise<FieldDocument[]> {
    return this.fieldModel
      .find({ entityId: new Types.ObjectId(entityId) })
      .exec();
  }

  /**
   * Update an existing field by ID
   */
  async update(
    id: string,
    dto: UpdateFieldDto,
  ): Promise<FieldDocument> {
    const { entityId, ...rest } = dto;
    const payload: Partial<Field> = {
      ...rest,
      ...(entityId ? { entityId: new Types.ObjectId(entityId) } : {}),
    };
    const updated = await this.fieldModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Field with id ${id} not found`);
    }
    return updated;
  }
}

