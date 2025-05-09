// src/users/dto/create-user.dto.ts

import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsMongoId,
    Matches,
    MaxLength,
  } from 'class-validator';
  
  export class CreateUserDto {
    @IsEnum(['admin', 'organizer', 'staff', 'client'])
    role: 'admin' | 'organizer' | 'staff' | 'client';
  
    @IsOptional()
    @IsMongoId()
    entityId?: string;
  
    @IsString()
    @MaxLength(100)
    name: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    passwordHash: string;
  
    @IsOptional()
    @Matches(/^\+?[0-9\s-]{7,20}$/, {
      message: 'phone must be a valid international phone number',
    })
    phone?: string;
  
    @IsOptional()
    @IsString()
    @MaxLength(200)
    address?: string;
  
    @IsOptional()
    @IsEnum(['pending', 'active', 'rejected'])
    status?: 'pending' | 'active' | 'rejected';
  }
  