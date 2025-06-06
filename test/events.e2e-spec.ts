import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Types } from 'mongoose';

function generateValidCIF() {
  const letters = 'ABCDEFGHJKLMNPQRSUVW';
  const digits = Math.random().toString().slice(2, 9); // 7 dígitos
  const letter = letters[Math.floor(Math.random() * letters.length)];
  return `${letter}${digits}`; // Ej: B1234567
}

describe('Events E2E', () => {
  let app: INestApplication;
  let server: any;
  let token: string;
  let userId: string;
  let fieldId: string;
  let eventId: string;

  const timestamp = Date.now();
  const testEmail = `event${timestamp}@test.com`;
  const testCIF = generateValidCIF();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    server = app.getHttpServer();

    // 1. Registro y login
    await request(server)
      .post('/api/auth/register')
      .send({ email: testEmail, password: '123456', name: 'Event User', role: 'organizer' })
      .expect(201);

    const loginRes = await request(server)
      .post('/api/auth/login')
      .send({ email: testEmail, password: '123456' })
      .expect(201);
    token = loginRes.body.access_token;

    const profileRes = await request(server)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    userId = profileRes.body._id;

    // 2. Crear entidad
    const entityRes = await request(server)
      .post('/api/entities')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Entity for Events',
        cif: testCIF,
        address: 'Calle Falsa 123',
        phone: '+34111222333',
        organizerId: userId,
      })
      .expect(201);

    const entityId = entityRes.body._id;

    // 3. Crear cancha
    const fieldRes = await request(server)
      .post('/api/fields')
      .set('Authorization', `Bearer ${token}`)
      .send({
        entityId,
        name: 'Campo Eventos',
        sportType: 'Futbol',
        location: 'Calle Evento 1',
        capacity: 10,
        availability: [],
        pricePerHour: 30,
        lighting: { available: true, price: 5 },
        lockerRoom: { available: true, price: 0 },
        equipmentRental: { available: false, price: 0 },
      })
      .expect(201);

    fieldId = fieldRes.body._id;
  });

  it('should create an event', async () => {
    const res = await request(server)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send({
        fieldId,
        date: new Date().toISOString(),
        startTime: '18:00',
        endTime: '19:30',
        maxPlayers: 10,
        eventType: 'match',
        pricePerPlayer: 5,
        players: [
          {
            userId,
            status: 'confirmed',
          },
        ],
      })
      .expect(201);

    eventId = res.body._id;
    expect(eventId).toBeDefined();
  });

  it('should fetch all events', async () => {
    const res = await request(server)
      .get('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should fetch event by id', async () => {
    const res = await request(server)
      .get(`/api/events/${eventId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveProperty('_id', eventId);
  });

  it('should update the event', async () => {
    const res = await request(server)
      .patch(`/api/events/${eventId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ maxPlayers: 12 })
      .expect(200);

    expect(res.body.maxPlayers).toBe(12);
  });

  it('should delete the event', async () => {
    const res = await request(server)
      .delete(`/api/events/${eventId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveProperty('_id', eventId);
  });

  afterAll(async () => {
    await app.close();
  });
});
