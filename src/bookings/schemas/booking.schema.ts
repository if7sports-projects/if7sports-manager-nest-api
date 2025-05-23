// src/bookings/schemas/booking.schema.ts
/**
 * @module BookingsModule
 * @description Mongoose schema definitions for the Booking entity
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

/**
 * Main Booking schema
 */
@Schema({ timestamps: true })
export class Booking {
  /** Reference to the user who made the booking */
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  /** Reference to the field being booked */
  @Prop({ type: Types.ObjectId, ref: 'Field', required: true })
  fieldId: Types.ObjectId;

  /** Reference to the parent entity */
  @Prop({ type: Types.ObjectId, ref: 'Entity', required: true })
  entityId: Types.ObjectId;

  /** Booking start timestamp */
  @Prop({ required: true })
  startTime: Date;

  /** Booking end timestamp */
  @Prop({ required: true })
  endTime: Date;

  /** Total price calculated at booking time */
  @Prop({ required: true, min: 0 })
  totalPrice: number;

  /** Status of the booking */
  @Prop({ enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' })
  status: string;
}

/**
 * Booking document interface
 */
export type BookingDocument = Booking & Document;
export const BookingSchema = SchemaFactory.createForClass(Booking);

// Indexes for efficient lookups
BookingSchema.index({ userId: 1 });
BookingSchema.index({ fieldId: 1 });
BookingSchema.index({ entityId: 1 });
