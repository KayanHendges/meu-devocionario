import { UserService } from '@api/modules/user/user.service';
import { JwtPayload } from '@auth/types';
import { CurrentUser } from '@decorators/user/current.user.decorator';
import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { IncludeUserPrayerDTO, RemoveUserPrayerDTO } from 'project-common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@CurrentUser() payload: JwtPayload) {
    return this.userService.getUser(payload);
  }

  @Get('prayers')
  getPrayers(@CurrentUser() payload: JwtPayload) {
    return this.userService.getPrayers(payload);
  }

  @Post('prayers')
  includePrayer(
    @CurrentUser() payload: JwtPayload,
    @Body() body: IncludeUserPrayerDTO,
  ) {
    return this.userService.includePrayer(payload, body);
  }

  @Delete('prayers')
  removePrayer(
    @CurrentUser() payload: JwtPayload,
    @Body() body: RemoveUserPrayerDTO,
  ) {
    return this.userService.removePrayer(payload, body);
  }
}
