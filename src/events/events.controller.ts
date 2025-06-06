import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from './dto/events.dto';

@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // Crear un nuevo evento
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  // Obtener todos los eventos (con filtro opcional por campo y fecha)
  @Get()
  findAll(@Query() query: { fieldId?: string; date?: string }) {
    return this.eventsService.findAll(query.fieldId, query.date);
  }

  // Obtener un evento por ID
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.eventsService.findById(id);
  }

  // Actualizar un evento por ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  // Eliminar un evento por ID
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.eventsService.delete(id);
  }
}

