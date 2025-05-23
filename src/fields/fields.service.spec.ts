// src/fields/fields.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken }       from '@nestjs/mongoose';
import { Types }               from 'mongoose';
import { FieldsService }       from './fields.service';
import { Field }               from './schemas/field.schema';

describe('FieldsService', () => {
  let service: FieldsService;

  const mockField = {
    _id: new Types.ObjectId().toHexString(),
    entityId: new Types.ObjectId(),
    name: 'Pista 1',
    sportType: 'Baloncesto',
    location: 'Calle Principal 123',
    capacity: 10,
    availability: [],
    pricePerHour: 15,
    lighting: { available: true, price: 5 },
    lockerRoom: { available: true, price: 0 },
    equipmentRental: { available: false, price: 0 },
  };

  // Forzamos el mockModel a any:
  const mockModel: any = jest.fn().mockImplementation(dto => ({
    save: () => Promise.resolve({ ...mockField, ...dto }),
  }));
  mockModel.find = jest.fn(() => ({ exec: () => Promise.resolve([mockField]) }));
  mockModel.findByIdAndUpdate = jest.fn(() => ({ exec: () => Promise.resolve(mockField) }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FieldsService,
        {
          provide: getModelToken(Field.name),
          useValue: mockModel,  // injectamos el any
        },
      ],
    }).compile();

    service = module.get<FieldsService>(FieldsService);
  });

  it('create should call constructor and save', async () => {
    const dto = {
      entityId: mockField.entityId.toHexString(),
      name: mockField.name,
      sportType: mockField.sportType,
      location: mockField.location,
      capacity: mockField.capacity,
      availability: [],
      pricePerHour: mockField.pricePerHour,
      lighting: mockField.lighting,
      lockerRoom: mockField.lockerRoom,
      equipmentRental: mockField.equipmentRental,
    };
    const result = await service.create(dto as any);

    // Verificamos que new model(payload) se llamó
    expect(mockModel).toHaveBeenCalledWith(
      expect.objectContaining({
        entityId: expect.any(Types.ObjectId),
        name: dto.name,
      })
    );
    expect(result).toMatchObject(mockField);
  });

  // … resto de tests …
});
