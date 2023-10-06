import { UserService } from '@users/users.service';
import { Controller } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
