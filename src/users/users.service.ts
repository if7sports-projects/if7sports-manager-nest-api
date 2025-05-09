// src/users/users.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const { entityId, ...rest } = createUserDto;
    const payload: Partial<User> = {
      ...rest,
      ...(entityId ? { entityId: new Types.ObjectId(entityId) } : {}),
    };
    const created = new this.userModel(payload);
    return created.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    const { entityId, ...rest } = updateUserDto;
    const payload: Partial<User> = {
      ...rest,
      ...(entityId ? { entityId: new Types.ObjectId(entityId) } : {}),
    };

    const updated = await this.userModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`User con id ${id} no encontrado`);
    }

    return updated;
  }
}
