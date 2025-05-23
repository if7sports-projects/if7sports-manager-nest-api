// src/fields/dto/create-field.dto.ts
/**
 * DTOs for creating a Field
 */
import {
  IsMongoId,
  IsString,
  MaxLength,
  IsOptional,
  IsNumber,
  Min,
  ValidateNested,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Availability slot DTO
 */
export class AvailabilityDto {
  @IsString()
  day: string;

  @IsString()
  startHour: string;

  @IsString()
  endHour: string;

  @IsNumber()
  @Min(0)
  specialPrice: number;

  @IsBoolean()
  blocked: boolean;
}

/**
 * Extra service DTO
 */
export class ExtraOptionDto {
  @IsBoolean()
  available: boolean;

  @IsNumber()
  @Min(0)
  price: number;
}

/**
 * DTO for creating a new Field
 */
export class CreateFieldDto {
  @IsMongoId()
  entityId: string;

  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(50)
  sportType: string;

  @IsString()
  @MaxLength(200)
  location: string;

  @IsNumber()
  @Min(1)
  capacity: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AvailabilityDto)
  availability?: AvailabilityDto[];

  @IsNumber()
  @Min(0)
  pricePerHour: number;

  @ValidateNested()
  @Type(() => ExtraOptionDto)
  lighting: ExtraOptionDto;

  @ValidateNested()
  @Type(() => ExtraOptionDto)
  lockerRoom: ExtraOptionDto;

  @ValidateNested()
  @Type(() => ExtraOptionDto)
  equipmentRental: ExtraOptionDto;
}