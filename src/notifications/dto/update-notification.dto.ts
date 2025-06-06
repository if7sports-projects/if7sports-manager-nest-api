// src/notifications/dto/update-notification.dto.ts

import {
  IsMongoId,
  IsEnum,
  IsString,
  MaxLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';

/**
 * DTO para actualizar una notificación existente.
 * Todos los campos son opcionales; solo se envían los que se deseen cambiar.
 */
export class UpdateNotificationDto {
  @IsOptional()
  @IsMongoId()
  userId?: string;

  @IsOptional()
  @IsMongoId()
  entityId?: string;

  @IsOptional()
  @IsEnum(['reservation_confirmed', 'booking_cancelled', 'other'])
  type?: 'reservation_confirmed' | 'booking_cancelled' | 'other';

  @IsOptional()
  @IsString()
  @MaxLength(500)
  message?: string;

  @IsOptional()
  @IsBoolean()
  read?: boolean;
}
