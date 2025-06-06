// src/payments/test/payments.dto.spec.ts

import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Types } from 'mongoose';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';

describe('Payment DTOs', () => {
  it('should validate CreatePaymentDto correctly', async () => {
    const dto = plainToInstance(CreatePaymentDto, {
      reservationId: new Types.ObjectId().toString(),
      userId: new Types.ObjectId().toString(),
      entityId: new Types.ObjectId().toString(),
      amount: 25.5,
      method: 'stripe',
      status: 'paid',
      paymentDate: new Date().toISOString(),
    });

    const errors = await validate(dto, { forbidUnknownValues: true });
    expect(errors.length).toBe(0);
  });

  it('should fail validation with missing required fields in CreatePaymentDto', async () => {
    const dto = plainToInstance(CreatePaymentDto, {});
    const errors = await validate(dto, { forbidUnknownValues: true });
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation with invalid CreatePaymentDto values', async () => {
    const dto = plainToInstance(CreatePaymentDto, {
      reservationId: 'not-an-objectid',
      userId: 'also-invalid',
      entityId: '123',
      amount: -5,
      method: '',
      status: 'unknown' as any,
      paymentDate: 'invalid-date',
    });

    const errors = await validate(dto, { forbidUnknownValues: true });
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should validate UpdatePaymentDto with partial data', async () => {
    const dto = plainToInstance(UpdatePaymentDto, {
      amount: 10,
      status: 'pending',
    });
    const errors = await validate(dto, { forbidUnknownValues: true });
    expect(errors.length).toBe(0);
  });

  it('should fail UpdatePaymentDto validation with invalid values', async () => {
    const dto = plainToInstance(UpdatePaymentDto, {
      amount: -1,
      status: 'invalid-status' as any,
      paymentDate: 'not-a-date',
    });
    const errors = await validate(dto, { forbidUnknownValues: true });
    expect(errors.length).toBeGreaterThan(0);
  });
});
