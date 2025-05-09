// src/app.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): { status: 'ok'; uptime: number; timestamp: string } {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
