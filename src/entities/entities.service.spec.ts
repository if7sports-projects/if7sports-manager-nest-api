// Ejemplo para src/entities/entities.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken }       from '@nestjs/mongoose';
import { Entity }                from './schemas/entity.schema';
import { EntitiesService } from './entities.service';

const mockModel = {
  find: jest.fn().mockReturnValue({ exec: () => Promise.resolve([]) }),
  findByIdAndUpdate: jest.fn().mockReturnValue({ exec: () => Promise.resolve(null) }),
  // …otros métodos según necesites
};

describe('UsersService', () => {
  let service: EntitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntitiesService,
        { provide: getModelToken(Entity.name), useValue: mockModel },
      ],
    }).compile();

    service = module.get<EntitiesService>(EntitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // …tus tests...
});
