import { Public } from '@api/decorators/auth/public.route';
import { LoginUserDTO, RegisterUserDTO, ValidateCodeDTO } from 'project-common';
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

  @Post('requestCode')
  requestCode(@CurrentUser() currentUser: JwtPayload) {
    return this.authService.requestCode(currentUser);
  }

  @Post('validateCode')
  validateCode(
    @Body() body: ValidateCodeDTO,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.authService.validateCode(body, currentUser);
  }
}
