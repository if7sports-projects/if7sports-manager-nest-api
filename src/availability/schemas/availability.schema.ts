import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class TimeSlot {
  @Prop({ required: true })
  startTime: string; // formato "HH:mm"

  @Prop({ required: true })
  endTime: string;

  @Prop({ required: true, enum: ['blocked', 'available', 'reserved'] })
  status: 'blocked' | 'available' | 'reserved';

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  reservedBy?: Types.ObjectId;

  @Prop()
  description?: string;
}

@Schema({ timestamps: true })
export class Availability extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Field', required: true })
  fieldId: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: [TimeSlot], default: [] })
  timeSlots: TimeSlot[];
}

export const AvailabilitySchema = SchemaFactory.createForClass(Availability);
export type AvailabilityDocument = Availability & Document;