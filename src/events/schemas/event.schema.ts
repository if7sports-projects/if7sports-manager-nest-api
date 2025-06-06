// src/events/schemas/event.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Field' })
  fieldId: Types.ObjectId;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ required: true })
  startTime: string;

  @Prop({ required: true })
  endTime: string;

  @Prop({
    type: [
      {
        userId: { type: Types.ObjectId, required: true, ref: 'User' },
        status: { type: String, enum: ['confirmed', 'waiting'], required: true },
      },
    ],
    default: [],
  })
  players: { userId: Types.ObjectId; status: 'confirmed' | 'waiting' }[];

  @Prop({ required: true })
  maxPlayers: number;

  @Prop({ required: true, enum: ['match', 'tournament', 'training'] })
  eventType: 'match' | 'tournament' | 'training';

  @Prop({ required: true })
  pricePerPlayer: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);
