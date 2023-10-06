import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from '@categories/caregories.module';
import { PrayersModule } from '@prayers/prayers.module';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@users/users.module';

@Module({
  imports: [
    AuthModule,
    CategoriesModule,
    PrayersModule,
    UserModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
