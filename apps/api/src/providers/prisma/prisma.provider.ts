import { config } from '@config/index';
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from 'database';

let _isConnected = false;

@Injectable()
export class PrismaProvider extends PrismaClient implements OnModuleInit {
  constructor() {
    const log: Prisma.PrismaClientOptions['log'] = ['error'];

    if (config.ENVIRONMENT === 'development') log.push('query', 'info', 'warn');
    super({ log });
  }

  async onModuleInit() {
    if (!_isConnected) {
      await this.$connect();
      _isConnected = true;
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
