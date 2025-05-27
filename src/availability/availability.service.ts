import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Availability, AvailabilityDocument } from './schemas/availability.schema';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectModel(Availability.name)
    private availabilityModel: Model<AvailabilityDocument>
  ) {}

  async create(dto: CreateAvailabilityDto): Promise<AvailabilityDocument> {
    return this.availabilityModel.create({
      ...dto,
      fieldId: new Types.ObjectId(dto.fieldId),
    });
  }

  async findByFieldAndDate(fieldId: string, date: string): Promise<AvailabilityDocument | null> {
    return this.availabilityModel.findOne({
      fieldId: new Types.ObjectId(fieldId),
      date: new Date(date),
    });
  }

  async updateTimeSlot(
    availabilityId: string,
    slotIndex: number,
    updates: Partial<{ status: string; reservedBy: string; description: string }>
  ): Promise<AvailabilityDocument> {
    const availability = await this.availabilityModel.findById(availabilityId);
    if (!availability) {
      throw new NotFoundException('Availability not found');
    }

    const slot = availability.timeSlots[slotIndex];
    if (!slot) {
      throw new NotFoundException('Time slot not found');
    }

    Object.assign(slot, updates);
    await availability.save();
    return availability;
  }

async update(id: string, dto: UpdateAvailabilityDto): Promise<AvailabilityDocument> {
  const availability = await this.availabilityModel.findById(id);
  if (!availability) {
    throw new NotFoundException('Availability not found');
  }

  if (dto.date) {
    availability.date = new Date(dto.date);
  }

 if (dto.timeSlots) {
  availability.timeSlots = dto.timeSlots; // ya están transformados por el DTO
}

  return availability.save();
}


}
