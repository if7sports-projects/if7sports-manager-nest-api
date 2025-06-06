// src/payments/dto/update-payment.dto.ts

import {
  IsMongoId,
  IsNumber,
  Min,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class UpdatePaymentDto {
  @IsOptional()
  @IsMongoId()
  reservationId?: string;

  @IsOptional()
  @IsMongoId()
  userId?: string;

  @IsOptional()
  @IsMongoId()
  entityId?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  amount?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  method?: string;

  @IsOptional()
  @IsEnum(['pending', 'paid', 'failed'])
  status?: 'pending' | 'paid' | 'failed';

  @IsOptional()
  @IsDateString()
  paymentDate?: string;
}
