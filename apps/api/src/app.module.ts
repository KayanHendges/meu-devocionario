import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from '@categories/caregories.module';
import { PrayersModule } from '@prayers/prayers.module';

@Module({
  imports: [CategoriesModule, PrayersModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
