// src/notifications/test/notifications.dto.spec.ts

import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Types } from 'mongoose';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { UpdateNotificationDto } from '../dto/update-notification.dto';

describe('Notification DTOs', () => {
  it('should validate CreateNotificationDto correctly', async () => {
    const dto = plainToInstance(CreateNotificationDto, {
      userId: new Types.ObjectId().toString(),
      entityId: new Types.ObjectId().toString(),
      type: 'reservation_confirmed',
      message: 'Tu reserva ha sido confirmada.',
      read: true,
    });

    const errors = await validate(dto, { forbidUnknownValues: true });
    expect(errors.length).toBe(0);
  });

  it('should fail validation with missing required fields in CreateNotificationDto', async () => {
    const dto = plainToInstance(CreateNotificationDto, {});
    const errors = await validate(dto, { forbidUnknownValues: true });
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation with invalid values in CreateNotificationDto', async () => {
    const dto = plainToInstance(CreateNotificationDto, {
      userId: 'invalid-id',
      entityId: '123',
      type: 'invalid_type' as any,
      message: '', // empty message
      read: 'not-a-boolean' as any,
    });
    const errors = await validate(dto, { forbidUnknownValues: true });
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should validate UpdateNotificationDto with partial data', async () => {
    const dto = plainToInstance(UpdateNotificationDto, {
      read: true,
    });
    const errors = await validate(dto, { forbidUnknownValues: true });
    expect(errors.length).toBe(0);
  });

  it('should fail UpdateNotificationDto validation with invalid values', async () => {
    const dto = plainToInstance(UpdateNotificationDto, {
      userId: 'not-objectid',
      type: 'not_a_type' as any,
      message: ''.padStart(501, 'a'), // too long
      read: 'yes' as any,
    });
    const errors = await validate(dto, { forbidUnknownValues: true });
    expect(errors.length).toBeGreaterThan(0);
  });
});
