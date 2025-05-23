// src/bookings/bookings.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken }       from '@nestjs/mongoose';
import { Types }               from 'mongoose';
import { BookingsService }     from './bookings.service';
import { Booking }             from './schemas/booking.schema';
import { NotFoundException }   from '@nestjs/common';

describe('BookingsService', () => {
  let service: BookingsService;
  const mockBooking = {
    _id: new Types.ObjectId().toHexString(),
    userId: new Types.ObjectId(),
    fieldId: new Types.ObjectId(),
    entityId: new Types.ObjectId(),
    startTime: new Date(),
    endTime: new Date(),
    totalPrice: 100,
    status: 'pending',
  };

  // Mock model as a constructor function
  const mockModel: any = jest.fn().mockImplementation(dto => ({ save: () => Promise.resolve({ ...mockBooking, ...dto }) }));
  mockModel.find = jest.fn(() => ({ exec: () => Promise.resolve([mockBooking]) }));
  mockModel.findByIdAndUpdate = jest.fn(() => ({ exec: () => Promise.resolve(mockBooking) }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        { provide: getModelToken(Booking.name), useValue: mockModel },
      ],
    }).compile();
    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new booking', async () => {
      const dto = {
        userId: mockBooking.userId.toHexString(),
        fieldId: mockBooking.fieldId.toHexString(),
        entityId: mockBooking.entityId.toHexString(),
        startTime: mockBooking.startTime.toISOString(),
        endTime: mockBooking.endTime.toISOString(),
        totalPrice: mockBooking.totalPrice,
      };
      const result = await service.create(dto as any);

      // Verify constructor call with correct types
      expect(mockModel).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: expect.any(Types.ObjectId),
          fieldId: expect.any(Types.ObjectId),
          entityId: expect.any(Types.ObjectId),
          totalPrice: dto.totalPrice,
          startTime: expect.any(Date),
          endTime: expect.any(Date),
        }),
      );

      // Verify returned object matches mockBooking
      expect(result).toEqual(
        expect.objectContaining({
          _id: mockBooking._id,
          userId: mockBooking.userId,
          fieldId: mockBooking.fieldId,
          entityId: mockBooking.entityId,
          totalPrice: mockBooking.totalPrice,
          status: mockBooking.status,
        }),
      );
      // Date fields should be Date instances
      expect(result.startTime).toBeInstanceOf(Date);
      expect(result.endTime).toBeInstanceOf(Date);
    });
  });

  describe('findAll', () => {
    it('should return an array of bookings', async () => {
      const result = await service.findAll();
      expect(mockModel.find).toHaveBeenCalled();
      expect(result).toEqual([mockBooking]);
    });
  });

  describe('findByUser', () => {
    it('should return bookings for a specific user', async () => {
      const userId = mockBooking.userId.toHexString();
      const result = await service.findByUser(userId);
      expect(mockModel.find).toHaveBeenCalledWith({ userId: new Types.ObjectId(userId) });
      expect(result).toEqual([mockBooking]);
    });
  });

  describe('update', () => {
    it('should update and return the booking', async () => {
      const updateDto = { status: 'confirmed' } as any;
      const result = await service.update(mockBooking._id as string, updateDto);
      expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
        mockBooking._id,
        expect.objectContaining({ status: updateDto.status }),
        { new: true },
      );
      expect(result).toEqual(mockBooking);
    });

    it('should throw NotFoundException if booking not found', async () => {
      // Override to return null
      (mockModel.findByIdAndUpdate as jest.Mock).mockReturnValue({ exec: () => Promise.resolve(null) });
      await expect(
        service.update(mockBooking._id as string, { status: 'cancelled' } as any),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
