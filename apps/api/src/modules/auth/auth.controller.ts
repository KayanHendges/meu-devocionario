import { Public } from '@api/decorators/auth/public.route';
import {
  LoginUserDTO,
  RegisterUserDTO,
  RequestCodeDTO,
  ResetPasswordDTO,
  LoginCodeDTO,
} from 'project-common';
import { AuthService } from '@auth/auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CurrentUser } from '@decorators/user/current.user.decorator';
import { JwtPayload } from '@auth/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Post('resetPassword')
  resetPassword(
    @Body() body: ResetPasswordDTO,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.authService.resetPassword(body, currentUser);
  }

  @Public()
  @Post('requestCode')
  requestCode(@Body() body: RequestCodeDTO) {
    return this.authService.requestCode(body);
  }

  @Public()
  @Post('loginCode')
  validateCode(@Body() body: LoginCodeDTO) {
    return this.authService.loginCode(body);
  }
}
