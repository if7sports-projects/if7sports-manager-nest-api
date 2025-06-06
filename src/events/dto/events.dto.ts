import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';

// Representa a un jugador dentro del evento (partido, entrenamiento, etc.)
export class PlayerDto {
  // ID del usuario participante
  @IsMongoId()
  userId: Types.ObjectId;

  // Estado del jugador respecto al evento
  @IsEnum(['confirmed', 'waiting'])
  status: 'confirmed' | 'waiting';
}

// DTO para crear un nuevo evento
export class CreateEventDto {
  // ID del campo donde se realizará el evento
  @IsMongoId()
  fieldId: Types.ObjectId;

  // Fecha del evento (formato ISO)
  @IsDateString()
  date: string;

  // Hora de inicio del evento (ej: "19:00")
  @IsString()
  startTime: string;

  // Hora de fin del evento (ej: "20:30")
  @IsString()
  endTime: string;

  // Lista de jugadores (opcional al crear)
  @ValidateNested({ each: true })
  @Type(() => PlayerDto)
  @IsOptional()
  players?: PlayerDto[];

  // Número máximo de jugadores permitidos
  @IsInt()
  @Min(1)
  maxPlayers: number;

  // Tipo de evento
  @IsEnum(['match', 'tournament', 'training'])
  eventType: 'match' | 'tournament' | 'training';

  // Precio por jugador en euros
  @IsNumber()
  @Min(0)
  pricePerPlayer: number;
}
// DTO para actualizar un evento (todos los campos son opcionales)
export class UpdateEventDto {
  @IsMongoId()
  @IsOptional()
  fieldId?: Types.ObjectId;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  startTime?: string;

  @IsString()
  @IsOptional()
  endTime?: string;

  @ValidateNested({ each: true })
  @Type(() => PlayerDto)
  @IsOptional()
  players?: PlayerDto[];

  @IsInt()
  @Min(1)
  @IsOptional()
  maxPlayers?: number;

  @IsEnum(['match', 'tournament', 'training'])
  @IsOptional()
  eventType?: 'match' | 'tournament' | 'training';

  @IsNumber()
  @Min(0)
  @IsOptional()
  pricePerPlayer?: number;
}

