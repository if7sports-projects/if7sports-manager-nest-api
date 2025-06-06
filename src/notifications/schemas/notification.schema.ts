// src/notifications/schemas/notification.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Notification {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Entity', required: true })
  entityId: Types.ObjectId;

  @Prop({
    type: String,
    enum: ['reservation_confirmed', 'booking_cancelled', 'other'],
    required: true,
  })
  type: 'reservation_confirmed' | 'booking_cancelled' | 'other';

  @Prop({ type: String, required: true, maxlength: 500 })
  message: string;

  @Prop({ type: Boolean, default: false })
  read: boolean;

  // createdAt se genera automáticamente gracias a `timestamps: { createdAt: true }`
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
