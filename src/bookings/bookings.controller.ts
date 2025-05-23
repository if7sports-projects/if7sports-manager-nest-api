// src/bookings/bookings.controller.ts
import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking as BookingModel } from './schemas/booking.schema';

/**
 * Controller exposing REST endpoints for Bookings
 */
@Controller('api/bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  /**
   * POST /api/bookings
   * Create a new booking
   */
  @Post()
  create(@Body() dto: CreateBookingDto): Promise<BookingModel> {
    return this.bookingsService.create(dto);
  }

  /**
   * GET /api/bookings
   * List all bookings
   */
  @Get()
  findAll(): Promise<BookingModel[]> {
    return this.bookingsService.findAll();
  }

  /**
   * GET /api/bookings/user/:userId
   * List bookings by user
   */
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): Promise<BookingModel[]> {
    return this.bookingsService.findByUser(userId);
  }

  /**
   * PATCH /api/bookings/:id
   * Update an existing booking
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBookingDto,
  ): Promise<BookingModel> {
    return this.bookingsService.update(id, dto);
  }
}
