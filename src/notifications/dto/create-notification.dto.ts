// src/notifications/dto/create-notification.dto.ts

import {
  IsMongoId,
  IsEnum,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
} from 'class-validator';

/**
 * DTO para crear una nueva notificación
 */

// userId, entityId: IDs válidos de MongoDB.

// type: solo uno de los valores permitidos.

// message: cadena no vacía, máximo 500 caracteres.

// read es opcional; por defecto se creará como false en el servicio cuando falte.
export class CreateNotificationDto {
  @IsMongoId()
  userId: string;

  @IsMongoId()
  entityId: string;

  @IsEnum(['reservation_confirmed', 'booking_cancelled', 'other'])
  type: 'reservation_confirmed' | 'booking_cancelled' | 'other';

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  message: string;

  @IsOptional()
  @IsBoolean()
  read?: boolean;
}
