
import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Types } from 'mongoose';
import { CreateEventDto, UpdateEventDto } from '../dto/events.dto';


describe('Event DTOs', () => {
  it('should validate CreateEventDto correctly', async () => {
    const dto = plainToInstance(CreateEventDto, {
      fieldId: new Types.ObjectId().toString(),
      date: new Date().toISOString(),
      startTime: '19:00',
      endTime: '20:30',
      maxPlayers: 10,
      eventType: 'match',
      pricePerPlayer: 5.5,
      players: [
        {
          userId: new Types.ObjectId().toString(),
          status: 'confirmed',
        },
      ],
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation with missing required fields in CreateEventDto', async () => {
    const dto = plainToInstance(CreateEventDto, {});
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should validate UpdateEventDto with partial data', async () => {
    const dto = plainToInstance(UpdateEventDto, {
      maxPlayers: 12,
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail UpdateEventDto validation with invalid enum', async () => {
    const dto = plainToInstance(UpdateEventDto, {
      eventType: 'invalid',
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
