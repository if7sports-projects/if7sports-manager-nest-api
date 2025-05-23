// Ejemplo para src/users/users.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken }       from '@nestjs/mongoose';
import { UsersService }        from './users.service';
import { User }                from './schemas/user.schema';

const mockModel = {
  find: jest.fn().mockReturnValue({ exec: () => Promise.resolve([]) }),
  findByIdAndUpdate: jest.fn().mockReturnValue({ exec: () => Promise.resolve(null) }),
  // …otros métodos según necesites
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken(User.name), useValue: mockModel },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // …tus tests...
});
