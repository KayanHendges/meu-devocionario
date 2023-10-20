import { Public } from '@api/decorators/auth/public.route';
import { LoginUserDTO, RegisterUserDTO } from 'project-common';
import { AuthService } from '@auth/auth.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CurrentUser } from '@decorators/user/current.user.decorator';
import { JwtPayload } from '@auth/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('user')
  user(@CurrentUser() currentUser: JwtPayload) {
    return this.authService.user(currentUser);
  }

  @Public()
  @Post('register')
  register(@Body() body: RegisterUserDTO) {
    return this.authService.register(body);
  }

  @Public()
  @Post('login')
  login(@Body() body: LoginUserDTO) {
    return this.authService.login(body);
  }
}
