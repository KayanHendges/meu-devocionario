import { Public } from '@decorators/auth/public.route';
import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Public()
  @Get('/')
  check() {
    return 'ok';
  }
}
