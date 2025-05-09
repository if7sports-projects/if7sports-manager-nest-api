import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createDto: Partial<User>): Promise<User> {
    const created = new this.userModel(createDto);
    return created.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
