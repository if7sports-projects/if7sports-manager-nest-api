import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(createDto: Partial<User>): Promise<User>;
    findAll(): Promise<User[]>;
}
