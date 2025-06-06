// test/payments.e2e-spec.ts

import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Types } from 'mongoose';

// Función auxiliar para generar CIF válidos aleatorios
function generateValidCIF() {
  const letters = 'ABCDEFGHJKLMNPQRSUVW';
  const digits = Math.random().toString().slice(2, 9); // 7 dígitos
  const letter = letters[Math.floor(Math.random() * letters.length)];
  return `${letter}${digits}`; // Ej: B1234567
}

describe('Payments E2E', () => {
  let app: INestApplication;
  let server: any;
  let token: string;
  let userId: string;
  let entityId: string;
  let fieldId: string;
  let bookingId: string;
  let paymentId: string;

  const timestamp = Date.now();
  const testEmail = `payment${timestamp}@test.com`;
  const testCIF = generateValidCIF();

  beforeAll(async () => {
    // Montar la aplicación de Nest para pruebas
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Habilitar validación global con transformaciones
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    server = app.getHttpServer();

    // 1) Registrar usuario (organizer) y hacer login
    await request(server)
      .post('/api/auth/register')
      .send({
        email: testEmail,
        password: '12345678',
        name: 'Payment User',
        role: 'organizer',
      })
      .expect(201);

    const loginRes = await request(server)
      .post('/api/auth/login')
      .send({ email: testEmail, password: '12345678' })
      .expect(201);
    token = loginRes.body.access_token; // Guardar el JWT

    const profileRes = await request(server)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    userId = profileRes.body._id; // Extraer userId del perfil

    // 2) Crear entidad asociada al organizer
    const entityRes = await request(server)
      .post('/api/entities')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Entity for Payments',
        cif: testCIF,
        address: 'Calle Pago 123',
        phone: '+34123456789',
        organizerId: userId,
      })
      .expect(201);
    entityId = entityRes.body._id; // Guardar entityId

    // 3) Crear cancha bajo la entidad recién creada
    const fieldRes = await request(server)
      .post('/api/fields')
      .set('Authorization', `Bearer ${token}`)
      .send({
        entityId,
        name: 'Campo Pago',
        sportType: 'Futbol',
        location: 'Calle Cancha Pago',
        capacity: 10,
        availability: [],
        pricePerHour: 20,
        lighting: { available: true, price: 5 },
        lockerRoom: { available: false, price: 0 },
        equipmentRental: { available: false, price: 0 },
      })
      .expect(201);
    fieldId = fieldRes.body._id; // Guardar fieldId

    // 4) Crear una reserva (booking) asociada a usuario, cancha y entidad
    const now = new Date();
    const later = new Date(now.getTime() + 60 * 60 * 1000);
    const bookingRes = await request(server)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId,
        fieldId,
        entityId,
        startTime: now.toISOString(),
        endTime: later.toISOString(),
        totalPrice: 20,
      })
      .expect(201);
    bookingId = bookingRes.body._id; // Guardar bookingId
  });

  it('should create a payment', async () => {
    // 5) Crear pago asociado a reservation, usuario y entidad
    const res = await request(server)
      .post('/api/payments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        reservationId: bookingId,
        userId,
        entityId,
        amount: 20.5,
        method: 'stripe',
        status: 'paid',
        paymentDate: new Date().toISOString(),
      })
      .expect(201);

    // Verificar que se devolvió un _id y los campos coinciden
    paymentId = res.body._id;
    expect(paymentId).toBeDefined();
    expect(res.body.reservationId).toBe(bookingId);
    expect(res.body.amount).toBe(20.5);
    expect(res.body.method).toBe('stripe');
    expect(res.body.status).toBe('paid');
  });

  it('should fetch all payments', async () => {
    // 6) Obtener lista completa de pagos
    const res = await request(server)
      .get('/api/payments')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    // Debe devolver un array con al menos el pago creado
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it('should fetch payment by id', async () => {
    // 7) Obtener pago por su ID
    const res = await request(server)
      .get(`/api/payments/${paymentId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    // Verificar que el ID y reservationId coinciden
    expect(res.body).toHaveProperty('_id', paymentId);
    expect(res.body.reservationId).toBe(bookingId);
  });

  it('should update the payment', async () => {
    // 8) Actualizar campo 'status' del pago
    const res = await request(server)
      .patch(`/api/payments/${paymentId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'failed' })
      .expect(200);

    // Verificar que el status se actualizó a 'failed'
    expect(res.body.status).toBe('failed');
  });

  it('should delete the payment', async () => {
    // 9) Eliminar el pago recién creado
    const res = await request(server)
      .delete(`/api/payments/${paymentId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    // La respuesta debería devolver el mismo _id eliminado
    expect(res.body).toHaveProperty('_id', paymentId);
  });

  afterAll(async () => {
    // Cerrar la aplicación Nest
    await app.close();
  });
});
