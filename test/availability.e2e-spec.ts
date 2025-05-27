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

describe('Availability E2E', () => {
  let app: INestApplication;
  let server: any;
  let token: string;
  let fieldId: string;
  let availabilityId: string;

  const timestamp = Date.now();
  const testEmail = `availability${timestamp}@test.com`;
  //const testCIF = `CIF${timestamp.toString().slice(-8)}`;
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
    .send({ email: testEmail, password: '123456', name: 'Availability User', role: 'organizer' })
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

    const userId = profileRes.body._id;

    // 2. Crear entidad
    const entityRes = await request(server)
      .post('/api/entities')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Entidad Test',
        cif: testCIF,
        address: 'Calle Test',
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
        name: 'Campo Central',
        sportType: 'Futbol',
        location: 'Calle Deportiva',
        capacity: 10,
        availability: [],
        pricePerHour: 25,
        lighting: { available: true, price: 5 },
        lockerRoom: { available: false, price: 0 },
        equipmentRental: { available: false, price: 0 },
      })
      .expect(201);

    fieldId = fieldRes.body._id;
  });

  it('should create availability for a field', async () => {
    const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd

    const res = await request(server)
      .post('/api/availability')
      .set('Authorization', `Bearer ${token}`)
      .send({
        fieldId,
        date: today,
        timeSlots: [
          {
            startTime: '09:00',
            endTime: '10:00',
            status: 'available',
            description: 'Hora libre',
          },
        ],
      })
      .expect(201);

    availabilityId = res.body._id;
    expect(res.body.fieldId).toBe(fieldId);
    expect(res.body.timeSlots.length).toBeGreaterThan(0);
  });

  it('should get availability by field and date', async () => {
    const today = new Date().toISOString().split('T')[0];

    const res = await request(server)
      .get(`/api/availability?fieldId=${fieldId}&date=${today}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('timeSlots');
    expect(Array.isArray(res.body.timeSlots)).toBe(true);
  });

  it('should update a time slot', async () => {
    const res = await request(server)
      .patch(`/api/availability/${availabilityId}/slot/0`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 'blocked',
        description: 'Bloqueado por mantenimiento',
      })
      .expect(200);

    expect(res.body.timeSlots[0].status).toBe('blocked');
    expect(res.body.timeSlots[0].description).toContain('mantenimiento');
  });

  afterAll(async () => {
    await app.close();
  });
});
