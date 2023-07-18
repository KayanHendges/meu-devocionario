import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from '@categories/caregories.module';
import { PrayersModule } from '@prayers/prayers.module';
import { MongoDBModule } from '@providers/mongo/mongo.module';

@Module({
  imports: [
    MongoDBModule,
    CategoriesModule,
    PrayersModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
