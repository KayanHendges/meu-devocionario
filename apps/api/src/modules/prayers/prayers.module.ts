import { Module } from '@nestjs/common';
import { PrayersController } from '@prayers/prayers.controller';
import { PrayersService } from '@prayers/prayers.service';
import { CategoriesRepositoryModule } from '@repositories/categories/categories.repository.module';
import { PrayersRepositoryModule } from '@repositories/prayers/prayers.repository.module';

@Module({
  imports: [PrayersRepositoryModule, CategoriesRepositoryModule],
  controllers: [PrayersController],
  providers: [PrayersService],
})
export class PrayersModule {}
