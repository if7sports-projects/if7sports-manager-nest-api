// src/auth/dto/register.dto.ts
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail() email: string;
  @IsString() @MinLength(6) password: string;
  @IsString() name: string;
 @IsOptional()
  @IsEnum(['admin', 'organizer', 'staff', 'client'])
  role?: 'admin' | 'organizer' | 'staff' | 'client';

}
