// src/app.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppController }       from './app.controller';
import { AppService }          from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  it('health() should return status ok structure', () => {
    const result = appController.health();
    expect(result).toEqual(
      expect.objectContaining({
        status: 'ok',
        uptime: expect.any(Number),
        timestamp: expect.any(String),
      }),
    );
  });
});
