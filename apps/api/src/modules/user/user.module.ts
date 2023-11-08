import { Module } from '@nestjs/common';
import { UserController } from '@user/user.controller';
import { UserService } from '@api/modules/user/user.service';
import { UserRepositoryModule } from '@repositories/user/user.repository.module';
import { UserPrayerRepositoryModule } from '@repositories/userPrayer/user.prayer.repository.module';
import { PrayerRepositoryModule } from '@repositories/prayer/prayer.repository.module';

@Module({
  imports: [
    UserRepositoryModule,
    UserPrayerRepositoryModule,
    PrayerRepositoryModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
