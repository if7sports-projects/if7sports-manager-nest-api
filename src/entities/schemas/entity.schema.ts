import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EntityDocument = Entity & Document;

@Schema({ timestamps: true })
export class Entity {
  @Prop({ required: true, maxlength: 100, trim: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
    uppercase: true,
    match: /^[A-Z0-9]{8,10}$/,
  })
  cif: string;

  @Prop({ required: true, maxlength: 200, trim: true })
  address: string;

  @Prop({ maxlength: 20, match: /^\+?[0-9\s-]{7,20}$/ })
  phone: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  organizerId: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  staff: Types.ObjectId[];

  @Prop({ enum: ['pending', 'active', 'rejected'], default: 'pending' })
  status: string;
}

export const EntitySchema = SchemaFactory.createForClass(Entity);

// Índices
EntitySchema.index({ cif: 1 }, { unique: true });
EntitySchema.index({ organizerId: 1 });
