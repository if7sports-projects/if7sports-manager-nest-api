// src/notifications/notifications.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Notification,
  NotificationDocument,
} from './schemas/notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}

  /**
   * Crear una nueva notificación
   */
  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    // Si no viene `read`, lo inicializamos a false:
    if (createNotificationDto.read === undefined) {
      createNotificationDto.read = false;
    }
    // Convertir `userId` y `entityId` a ObjectId
    const payload: Partial<Notification> = {
      ...createNotificationDto,
      userId: new Types.ObjectId(createNotificationDto.userId),
      entityId: new Types.ObjectId(createNotificationDto.entityId),
      type: createNotificationDto.type,
      message: createNotificationDto.message,
      read: createNotificationDto.read,
      // `createdAt` se genera automáticamente
    };
    const created = new this.notificationModel(payload as Notification);
    return created.save();
  }

  /**
   * Listar todas las notificaciones, con posibilidad de filtro por userId o entityId.
   */
  async findAll(
    userId?: string,
    entityId?: string,
  ): Promise<Notification[]> {
    const filters: any = {};
    if (userId) {
      filters.userId = new Types.ObjectId(userId);
    }
    if (entityId) {
      filters.entityId = new Types.ObjectId(entityId);
    }
    return this.notificationModel.find(filters).exec();
  }

  /**
   * Obtener una notificación por su ID
   */
  async findById(id: string): Promise<Notification> {
    const notification = await this.notificationModel
      .findById(id)
      .exec();
    if (!notification) {
      throw new NotFoundException(`Notificación con ID ${id} no encontrada`);
    }
    return notification;
  }

  /**
   * Actualizar una notificación existente
   */
  async update(
    id: string,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    // Convertir posibles IDs a ObjectId en el DTO
    const payload: Partial<Notification> = {};
    if (updateNotificationDto.userId) {
      payload.userId = new Types.ObjectId(updateNotificationDto.userId);
    }
    if (updateNotificationDto.entityId) {
      payload.entityId = new Types.ObjectId(updateNotificationDto.entityId);
    }
    if (updateNotificationDto.type) {
      payload.type = updateNotificationDto.type;
    }
    if (updateNotificationDto.message) {
      payload.message = updateNotificationDto.message;
    }
    if (updateNotificationDto.read !== undefined) {
      payload.read = updateNotificationDto.read;
    }

    const updated = await this.notificationModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Notificación con ID ${id} no encontrada`);
    }
    return updated;
  }

  /**
   * Eliminar una notificación por su ID
   */
  async remove(id: string): Promise<Notification> {
    const deleted = await this.notificationModel
      .findByIdAndDelete(id)
      .exec();
    if (!deleted) {
      throw new NotFoundException(`Notificación con ID ${id} no encontrada`);
    }
    return deleted;
  }
}
