import { Module } from '@nestjs/common';
import { PrayersController } from '@prayers/prayers.controller';
import { PrayersService } from '@prayers/prayers.service';
import { CategoryRepositoryModule } from '@repositories/category/category.repository.module';
import { PrayerRepositoryModule } from '@repositories/prayer/prayer.repository.module';

@Module({
  imports: [PrayerRepositoryModule, CategoryRepositoryModule],
  controllers: [PrayersController],
  providers: [PrayersService],
})
export class PrayersModule {}
