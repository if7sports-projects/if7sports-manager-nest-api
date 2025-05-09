// src/app.controller.ts

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // raíz del API
export class AppController {
  constructor(private readonly appService: AppService) {}

  /** Endpoint que usará el balanceador para saber que la aplicación está viva */
  @Get('health')
  health() {
    return this.appService.getHealth();
  }
}
