import { IsEnum, IsOptional, IsMongoId, IsString } from 'class-validator';

export class UpdateTimeSlotDto {
  @IsOptional()
  @IsEnum(['blocked', 'available', 'reserved'])
  status?: 'blocked' | 'available' | 'reserved';

  @IsOptional()
  @IsMongoId()
  reservedBy?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
