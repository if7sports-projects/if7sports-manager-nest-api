// src/fields/dto/update-field.dto.ts
/**
 * DTO for updating an existing Field (all properties optional)
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateFieldDto } from './create-field.dto';

export class UpdateFieldDto extends PartialType(CreateFieldDto) {}
