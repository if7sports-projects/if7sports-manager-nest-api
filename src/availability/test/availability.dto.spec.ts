import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateAvailabilityDto } from '../dto/create-availability.dto';
import { UpdateAvailabilityDto } from '../dto/update-availability.dto';
import { Types } from 'mongoose';

describe('Availability DTOs', () => {
  const validSlot = {
    startTime: '09:00',
    endTime: '10:00',
    status: 'reserved',
    reservedBy: new Types.ObjectId().toHexString(),
    description: 'Partido privado',
  };

  const validFieldId = new Types.ObjectId().toHexString();
  const validDate = new Date().toISOString();

  it('should validate and transform CreateAvailabilityDto correctly', async () => {
    const input = {
      fieldId: validFieldId,
      date: validDate,
      timeSlots: [validSlot],
    };

    const dto = plainToInstance(CreateAvailabilityDto, input);
    const errors = await validate(dto);

    expect(errors.length).toBe(0);
    expect(dto.timeSlots[0].reservedBy).toBeInstanceOf(Types.ObjectId);
  });

  it('should fail validation if required fields are missing in CreateAvailabilityDto', async () => {
    const input = {
      // fieldId is missing
      date: validDate,
      timeSlots: [],
    };

    const dto = plainToInstance(CreateAvailabilityDto, input);
    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('should validate and transform UpdateAvailabilityDto correctly', async () => {
    const input = {
      date: validDate,
      timeSlots: [
        {
          ...validSlot,
          reservedBy: validSlot.reservedBy,
        },
      ],
    };

    const dto = plainToInstance(UpdateAvailabilityDto, input);
    const errors = await validate(dto);

    expect(errors.length).toBe(0);
    expect(dto.timeSlots?.[0].reservedBy).toBeInstanceOf(Types.ObjectId);
  });

  it('should allow partial update in UpdateAvailabilityDto', async () => {
    const input = {
      timeSlots: [
        {
          startTime: '11:00',
          endTime: '12:00',
          status: 'blocked',
        },
      ],
    };

    const dto = plainToInstance(UpdateAvailabilityDto, input);
    const errors = await validate(dto, { forbidUnknownValues: true });


    expect(errors.length).toBe(0);
    expect(dto.timeSlots?.[0].status).toBe('blocked');
  });
});
