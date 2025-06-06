// src/notifications/notifications.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
  ) {}

  /**
   * POST /api/notifications
   * Crea una nueva notificación.
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  /**
   * GET /api/notifications
   * Listar notificaciones. Opcionalmente filtradas por `userId` o `entityId` vía query params.
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('userId') userId?: string,
    @Query('entityId') entityId?: string,
  ) {
    return this.notificationsService.findAll(userId, entityId);
  }

  /**
   * GET /api/notifications/:id
   * Obtener notificación por ID.
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findById(id);
  }

  /**
   * PATCH /api/notifications/:id
   * Actualizar campos de una notificación existente.
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  /**
   * DELETE /api/notifications/:id
   * Eliminar una notificación.
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(id);
  }
}

