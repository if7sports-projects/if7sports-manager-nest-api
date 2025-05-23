// src/bookings/dto/create-booking.dto.ts
/**
 * DTOs for creating a Booking
 */
import {
  IsMongoId,
  IsDateString,
  IsNumber,
  Min,
  IsEnum,
  IsOptional,
} from 'class-validator';

/**
 * DTO for creating a new Booking
 */
export class CreateBookingDto {
  @IsMongoId()
  userId: string;

  @IsMongoId()
  fieldId: string;

  @IsMongoId()
  entityId: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsNumber()
  @Min(0)
  totalPrice: number;

  @IsOptional()
  @IsEnum(['pending', 'confirmed', 'cancelled'])
  status?: 'pending' | 'confirmed' | 'cancelled';
}

