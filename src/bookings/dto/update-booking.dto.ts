// src/bookings/dto/update-booking.dto.ts
/**
 * DTO for updating an existing Booking
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './create-booking.dto';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {}