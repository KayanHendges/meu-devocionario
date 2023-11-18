import { Module } from '@nestjs/common';
import { PrismaProvider } from '@providers/prisma/prisma.provider';
import { PrismaUserPrayerRepository } from '@repositories/userPrayer/implementations/prisma.user.prayer.repository';
import { IUserPrayerRepository } from '@repositories/userPrayer/user.prayer.repository.interface';
@Module({
  controllers: [],
  providers: [
    PrismaProvider,
    {
      provide: IUserPrayerRepository,
      useClass: PrismaUserPrayerRepository,
    },
  ],
  exports: [IUserPrayerRepository],
})
export class UserPrayerRepositoryModule {}
