// test/notifications.e2e-spec.ts

import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Types } from 'mongoose';

// Función auxiliar para generar CIFs válidos
function generateValidCIF() {
  const letters = 'ABCDEFGHJKLMNPQRSUVW';
  const digits = Math.random().toString().slice(2, 9); // 7 dígitos aleatorios
  const letter = letters[Math.floor(Math.random() * letters.length)];
  return `${letter}${digits}`; // Ej: B1234567
}

describe('Notifications E2E', () => {
  let app: INestApplication;
  let server: any;
  let token: string;
  let userId: string;
  let entityId: string;
  let notificationId: string;

  const timestamp = Date.now();
  const testEmail = `notify${timestamp}@test.com`;
  const testCIF = generateValidCIF();

  beforeAll(async () => {
    // 1) Montar la aplicación Nest para pruebas
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Habilitar validación global
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    server = app.getHttpServer();

    // 2) Registrar un usuario con rol "organizer" para crear entidad
    await request(server)
      .post('/api/auth/register')
      .send({
        email: testEmail,
        password: '12345678',
        name: 'Notify User',
        role: 'organizer',
      })
      .expect(201);

    // 3) Hacer login y extraer token
    const loginRes = await request(server)
      .post('/api/auth/login')
      .send({ email: testEmail, password: '12345678' })
      .expect(201);
    token = loginRes.body.access_token;

    // 4) Obtener perfil para extraer userId
    const profileRes = await request(server)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    userId = profileRes.body._id;

    // 5) Crear una entidad necesaria para notifications.entityId
    const entityRes = await request(server)
      .post('/api/entities')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Entity for Notifications',
        cif: testCIF,
        address: 'Calle Notif 123',
        phone: '+34123456789',
        organizerId: userId,
      })
      .expect(201);
    entityId = entityRes.body._id;
  });

  it('should create a notification', async () => {
    // 6) Crear notificación
    const res = await request(server)
      .post('/api/notifications')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId,
        entityId,
        type: 'reservation_confirmed',
        message: 'Tu reserva ha sido confirmada.',
        read: false,
      })
      .expect(201);

    notificationId = res.body._id;
    expect(res.body.userId).toBe(userId);
    expect(res.body.entityId).toBe(entityId);
    expect(res.body.type).toBe('reservation_confirmed');
    expect(res.body.message).toContain('confirmada');
    expect(res.body.read).toBe(false);
    expect(notificationId).toBeDefined();
  });

  it('should fetch all notifications (filter by userId)', async () => {
    // 7) Listar notificaciones filtradas por userId en query params
    const res = await request(server)
      .get(`/api/notifications?userId=${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    // Debe contener al menos la notificación creada
    expect(res.body.find((n: any) => n._id === notificationId)).toBeDefined();
  });

  it('should fetch notification by id', async () => {
    // 8) Obtener notificación por ID
    const res = await request(server)
      .get(`/api/notifications/${notificationId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveProperty('_id', notificationId);
    expect(res.body.userId).toBe(userId);
  });

  it('should update the notification (mark as read)', async () => {
    // 9) Marcar la notificación como leída
    const res = await request(server)
      .patch(`/api/notifications/${notificationId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ read: true })
      .expect(200);

    expect(res.body._id).toBe(notificationId);
    expect(res.body.read).toBe(true);
  });

  it('should delete the notification', async () => {
    // 10) Eliminar la notificación
    const res = await request(server)
      .delete(`/api/notifications/${notificationId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body._id).toBe(notificationId);
  });

  afterAll(async () => {
    // Cerrar la aplicación Nest
    await app.close();
  });
});
