import { Module } from '@nestjs/common';
import { UserController } from '@users/users.controller';
import { UserService } from '@users/users.service';
import { UserRepositoryModule } from '@repositories/user/user.repository.module';

@Module({
  imports: [UserRepositoryModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
