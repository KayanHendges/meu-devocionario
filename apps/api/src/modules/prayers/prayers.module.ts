import { Module } from '@nestjs/common';
import { PrayersController } from '@prayers/prayers.controller';
import { PrayersService } from '@prayers/prayers.service';
import { PrayersRepositoryModule } from '@repositories/prayers/prayers.repository.module';

@Module({
  imports: [PrayersRepositoryModule],
  controllers: [PrayersController],
  providers: [PrayersService],
})
export class PrayersModule {}
