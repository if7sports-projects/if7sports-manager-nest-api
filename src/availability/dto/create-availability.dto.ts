import {
  IsArray,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';

class TimeSlotDto {
  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsEnum(['blocked', 'available', 'reserved'])
  status: 'blocked' | 'available' | 'reserved';

  @IsOptional()
  @Transform(({ value }) => {
    try {
      return value ? new Types.ObjectId(value) : undefined;
    } catch {
      return value;
    }
  })
  reservedBy?: Types.ObjectId;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateAvailabilityDto {
  @IsMongoId()
  fieldId: string;

  @IsDateString()
  date: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeSlotDto)
  timeSlots: TimeSlotDto[];
}
