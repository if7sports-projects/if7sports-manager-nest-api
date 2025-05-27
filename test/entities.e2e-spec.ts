import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Entities E2E', () => {
  let app: INestApplication;
  let token: string;
  let userId: string;

  const timestamp = Date.now();
  const email = `entities${timestamp}@test.com`;
  //const testCIF = 'B1234567H';
    const testCIF = `B${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();

    const server = app.getHttpServer();

    // Registro del usuario
    await request(server)
      .post('/api/auth/register')
      .send({ email, password: '123456', name: 'Entity User' })
      .expect(201);

    // Login y obtención del token
    const loginRes = await request(server)
      .post('/api/auth/login')
      .send({ email, password: '123456' })
      .expect(201);
    token = loginRes.body.access_token;

    // Obtener userId desde el perfil
    const profileRes = await request(server)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    console.log('PROFILE (entities):', profileRes.body);

    userId = profileRes.body._id;
    console.log('👤 userId:', userId);
    expect(userId).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });

  it('creates an entity', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/entities')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Entidad Test',
        cif: testCIF,
        address: 'Calle Entidad',
        phone: '+34123456789',
        organizerId: userId,
      });

    console.log('📥 Status code:', res.status);
    console.log('❌ Error body:', res.body);

    // Ahora validamos el resultado:
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Entidad Test');
  });
});
