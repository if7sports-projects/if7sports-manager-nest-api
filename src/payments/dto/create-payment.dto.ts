// src/payments/dto/create-payment.dto.ts

import {
  IsMongoId,
  IsNumber,
  Min,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsDateString,
} from 'class-validator';

export class CreatePaymentDto {
  @IsMongoId()
  reservationId: string;

  @IsMongoId()
  userId: string;

  @IsMongoId()
  entityId: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  @IsNotEmpty()
  method: string; // Ej: 'stripe', 'paypal', 'cash', etc.

  @IsEnum(['pending', 'paid', 'failed'])
  status: 'pending' | 'paid' | 'failed';

  @IsDateString()
  paymentDate: string;
}
