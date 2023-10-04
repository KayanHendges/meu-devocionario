import { Module } from '@nestjs/common';
import { PrismaProvider } from '@providers/prisma/prisma.provider';
import { PrismaPrayerRepository } from '@repositories/prayer/implementations/prisma.category.repository';
import { IPrayerRepository } from '@repositories/prayer/prayer.repository.interface';
@Module({
  controllers: [],
  providers: [
    PrismaProvider,
    {
      provide: IPrayerRepository,
      useClass: PrismaPrayerRepository,
    },
  ],
  exports: [IPrayerRepository],
})
export class PrayerRepositoryModule {}
