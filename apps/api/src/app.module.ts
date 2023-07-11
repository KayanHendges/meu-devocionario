import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongoDBModule } from '@providers/mongo/mongo.module';
import { CategoriesModule } from '@categories/caregories.module';

@Module({
  imports: [MongoDBModule, CategoriesModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
