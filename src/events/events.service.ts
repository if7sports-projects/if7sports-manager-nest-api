import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { CreateEventDto, UpdateEventDto } from './dto/events.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  // Crear un nuevo evento
  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);
    return createdEvent.save();
  }

  // Obtener eventos con filtros opcionales
  async findAll(fieldId?: string, date?: string): Promise<Event[]> {
    const filters: any = {};

    if (fieldId) {
      filters.fieldId = new Types.ObjectId(fieldId);
    }

    if (date) {
      const dayStart = new Date(date);
      dayStart.setUTCHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setUTCHours(23, 59, 59, 999);
      filters.date = { $gte: dayStart, $lte: dayEnd };
    }

    return this.eventModel.find(filters).exec();
  }

  // Obtener un evento por su ID
  async findById(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id).exec();
    if (!event) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado.`);
    }
    return event;
  }

  // Actualizar un evento existente
  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const updated = await this.eventModel.findByIdAndUpdate(id, updateEventDto, { new: true }).exec();
    if (!updated) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado.`);
    }
    return updated;
  }

  // Eliminar un evento por su ID
  async delete(id: string): Promise<Event> {
    const deleted = await this.eventModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado.`);
    }
    return deleted;
  }
}
