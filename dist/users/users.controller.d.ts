import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(dto: Partial<User>): Promise<User>;
    findAll(): Promise<User[]>;
}
