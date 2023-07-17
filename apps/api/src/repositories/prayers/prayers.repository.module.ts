import { Prayer } from '@entities/prayer';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrayerSchema } from '@providers/mongo/schemas/prayer.schema';
import { MongoPrayersRepository } from '@repositories/prayers/implementations/mongo.prayers.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Prayer.name, schema: PrayerSchema }]),
  ],
  providers: [
    { provide: 'IPrayersRepository', useClass: MongoPrayersRepository },
  ],
  exports: ['IPrayersRepository'],
})
export class PrayersRepositoryModule {}
