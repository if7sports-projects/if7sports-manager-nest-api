import {
    IsString,
    MaxLength,
    Matches,
    IsOptional,
    IsMongoId,
    IsArray,
    IsEnum,
  } from 'class-validator';
  
  export class CreateEntityDto {
    @IsString()
    @MaxLength(100)
    name: string;
  
    @IsString()
    @Matches(/^[A-Z0-9]{8,10}$/, {
      message: 'cif must be 8–10 uppercase alphanumeric characters',
    })
    cif: string;
  
    @IsString()
    @MaxLength(200)
    address: string;
  
    @IsOptional()
    @Matches(/^\+?[0-9\s-]{7,20}$/, {
      message: 'phone must be a valid international phone number',
    })
    phone?: string;
  
    @IsMongoId()
    organizerId: string;
  
    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    staff?: string[];
  
    @IsOptional()
    @IsEnum(['pending', 'active', 'rejected'])
    status?: 'pending' | 'active' | 'rejected';
  }
  