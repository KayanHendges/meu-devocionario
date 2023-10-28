import { Module } from '@nestjs/common';
import { UserController } from '@user/user.controller';
import { UserService } from '@api/modules/user/user.service';
import { UserRepositoryModule } from '@repositories/user/user.repository.module';

@Module({
  imports: [UserRepositoryModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
