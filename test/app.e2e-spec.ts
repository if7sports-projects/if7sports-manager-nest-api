import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('API Endpoints (E2E Global)', () => {
  let app: INestApplication;
  let authToken: string;
  let userId: string;
  let entityId: string;
  let fieldId: string;
  let bookingId: string;

  const timestamp = Date.now();
  const testEmail = `e2e${timestamp}@test.com`;
  const testCIF = `B${timestamp.toString().slice(-8)}`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }));
    await app.init();

    const server = app.getHttpServer();

    // 1. Registro
    await request(server)
      .post('/api/auth/register')
      .send({ email: testEmail, password: '123456', name: 'E2E User' })
      .expect(201);

    // 2. Login
    const loginRes = await request(server)
      .post('/api/auth/login')
      .send({ email: testEmail, password: '123456' })
      .expect(201);
    authToken = loginRes.body.access_token;

    // 3. Perfil
    const profileRes = await request(server)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    console.log('PROFILE (app):', profileRes.body);
    userId = profileRes.body._id;
    expect(userId).toBeDefined();

    // 4. Crear entidad
    const entityRes = await request(server)
      .post('/api/entities')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Entidad Global E2E',
        cif: testCIF,
        address: 'Calle Prueba 123',
        phone: '+34666111222',
        organizerId: userId,
        status: 'pending',
        staff: [],
      })
      .expect(201);

    entityId = entityRes.body._id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/fields (POST) - create field', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/fields')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        entityId,
        name: 'Pista Global',
        sportType: 'Futbol',
        location: 'Calle Prueba 123',
        capacity: 10,
        availability: [],
        pricePerHour: 25,
        lighting: { available: true, price: 5 },
        lockerRoom: { available: true, price: 0 },
        equipmentRental: { available: false, price: 0 },
      })
      .expect(201);
    fieldId = res.body._id;
  });

  it('/api/bookings (POST) - create booking', async () => {
    const now = new Date();
    const later = new Date(now.getTime() + 60 * 60 * 1000);

    const res = await request(app.getHttpServer())
      .post('/api/bookings')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        userId,
        fieldId,
        entityId,
        startTime: now.toISOString(),
        endTime: later.toISOString(),
        totalPrice: 25,
      })
      .expect(201);

    bookingId = res.body._id;
    expect(bookingId).toBeDefined();
  });

  it('/api/bookings/:id (PATCH) - update booking status', () => {
    return request(app.getHttpServer())
      .patch(`/api/bookings/${bookingId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ status: 'confirmed' })
      .expect(200)
      .expect(res => expect(res.body.status).toBe('confirmed'));
  });
});
