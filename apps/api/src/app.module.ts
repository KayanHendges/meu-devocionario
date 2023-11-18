import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from '@categories/caregories.module';
import { PrayersModule } from '@prayers/prayers.module';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@api/modules/user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { config } from '@config/index';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    AuthModule,
    CategoriesModule,
    PrayersModule,
    UserModule,
    MailerModule.forRoot({
      transport: {
        host: config.SMTP_HOST,
        port: config.SMTP_PORT,
        auth: {
          user: config.SMTP_EMAIL,
          pass: config.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: config.SMTP_EMAIL,
      },
    }),
    ConfigModule.forRoot(),
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
