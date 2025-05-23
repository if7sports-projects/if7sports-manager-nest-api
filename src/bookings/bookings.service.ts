// src/bookings/bookings.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

/**
 * Service that handles business logic for Bookings
 */
@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  /**
   * Create a new booking
   */
  async create(dto: CreateBookingDto): Promise<BookingDocument> {
    const { userId, fieldId, entityId, ...rest } = dto;
    const payload: Partial<Booking> = {
      ...rest,
      userId: new Types.ObjectId(userId),
      fieldId: new Types.ObjectId(fieldId),
      entityId: new Types.ObjectId(entityId),
      startTime: new Date(dto.startTime),
      endTime: new Date(dto.endTime),
    };
    const created = new this.bookingModel(payload);
    return created.save();
  }

  /**
   * Retrieve all bookings
   */
  async findAll(): Promise<BookingDocument[]> {
    return this.bookingModel.find().exec();
  }

  /**
   * Retrieve bookings by user
   */
  async findByUser(userId: string): Promise<BookingDocument[]> {
    return this.bookingModel
      .find({ userId: new Types.ObjectId(userId) })
      .exec();
  }

  /**
   * Update an existing booking
   */
  async update(
    id: string,
    dto: UpdateBookingDto,
  ): Promise<BookingDocument> {
    const payload: Partial<Booking> = { ...dto } as any;
    if (dto.startTime) payload.startTime = new Date(dto.startTime);
    if (dto.endTime) payload.endTime = new Date(dto.endTime);

    const updated = await this.bookingModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    }
    return updated;
  }
}

