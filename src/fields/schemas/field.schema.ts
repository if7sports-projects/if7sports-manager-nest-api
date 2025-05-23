// src/fields/schemas/field.schema.ts
/**
 * @module FieldsModule
 * @description Mongoose schema definitions for the Field entity, including sub-schemas
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

/**
 * Sub-document schema for availability slots
 */
@Schema()
export class Availability {
  /** Day of the week */
  @Prop({ required: true })
  day: string;

  /** Opening time (HH:MM) */
  @Prop({ required: true })
  startHour: string;

  /** Closing time (HH:MM) */
  @Prop({ required: true })
  endHour: string;

  /** Custom price for this slot */
  @Prop({ required: true })
  specialPrice: number;

  /** Whether this slot is blocked/unavailable */
  @Prop({ default: false })
  blocked: boolean;
}
export const AvailabilitySchema = SchemaFactory.createForClass(Availability);

/**
 * Sub-document schema for extra services
 */
@Schema()
export class ExtraOption {
  /** Is the extra service available? */
  @Prop({ default: false })
  available: boolean;

  /** Additional price for this service */
  @Prop({ default: 0 })
  price: number;
}
export const ExtraOptionSchema = SchemaFactory.createForClass(ExtraOption);

/**
 * Main Field schema
 */
@Schema({ timestamps: true })
export class Field {
  /** Reference to the parent Entity */
  @Prop({ type: Types.ObjectId, ref: 'Entity', required: true })
  entityId: Types.ObjectId;

  /** Name/label of the field */
  @Prop({ required: true, trim: true, maxlength: 100 })
  name: string;

  /** Type of sport (e.g., Basketball) */
  @Prop({ required: true, trim: true, maxlength: 50 })
  sportType: string;

  /** Physical location/address */
  @Prop({ required: true, trim: true, maxlength: 200 })
  location: string;

  /** Maximum number of participants */
  @Prop({ required: true, min: 1 })
  capacity: number;

  /** Array of availability slots */
  @Prop({ type: [AvailabilitySchema], default: [] })
  availability: Availability[];

  /** Base price per hour */
  @Prop({ required: true, min: 0 })
  pricePerHour: number;

  /** Lighting option and its price */
  @Prop({ type: ExtraOptionSchema, default: {} })
  lighting: ExtraOption;

  /** Locker room option */
  @Prop({ type: ExtraOptionSchema, default: {} })
  lockerRoom: ExtraOption;

  /** Equipment rental option */
  @Prop({ type: ExtraOptionSchema, default: {} })
  equipmentRental: ExtraOption;
}

/**
 * Field document interface
 */
export type FieldDocument = Field & Document;
export const FieldSchema = SchemaFactory.createForClass(Field);

// Index to speed up queries by entity
FieldSchema.index({ entityId: 1 });
