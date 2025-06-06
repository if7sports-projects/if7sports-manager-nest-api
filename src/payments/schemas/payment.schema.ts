// src/payments/schemas/payment.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ type: Types.ObjectId, ref: 'Reservation', required: true })
  reservationId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Entity', required: true })
  entityId: Types.ObjectId;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: String, required: true })
  method: string; // Ej: 'stripe', 'paypal', 'cash'

  @Prop({
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
    required: true,
  })
  status: 'pending' | 'paid' | 'failed';

  @Prop({ type: Date, required: true })
  paymentDate: Date;

  // createdAt y updatedAt se añaden automáticamente por `timestamps: true`
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
