import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Query,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';

@Controller('api/availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  create(@Body() dto: CreateAvailabilityDto) {
    return this.availabilityService.create(dto);
  }

  @Get()
  getByFieldAndDate(
    @Query('fieldId') fieldId: string,
    @Query('date') date: string
  ) {
    return this.availabilityService.findByFieldAndDate(fieldId, date);
  }

  @Patch(':id/slot/:index')
  updateSlot(
    @Param('id') availabilityId: string,
    @Param('index', ParseIntPipe) slotIndex: number,
    @Body() updates: { status?: string; reservedBy?: string; description?: string }
  ) {
    return this.availabilityService.updateTimeSlot(availabilityId, slotIndex, updates);
  }

  @Patch(':id')
  updateAvailability(
  @Param('id') id: string,
  @Body() dto: UpdateAvailabilityDto
) {
  return this.availabilityService.update(id, dto);
}

}
