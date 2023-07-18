import { Prayer } from '@entities/prayer';
import { InjectModel } from '@nestjs/mongoose';
import { PrayerDocument } from '@providers/mongo/schemas/prayer.schema';
import { MongoAbstractRepository } from '@repositories/base/mongo/mongo.abstract.repository';
import { IPrayersRepository } from '@repositories/prayers/prayers.repository.interface';
import { Model } from 'mongoose';

export class MongoPrayersRepository
  extends MongoAbstractRepository<Prayer, 'id', PrayerDocument>
  implements IPrayersRepository
{
  constructor(
    @InjectModel(Prayer.name)
    private readonly prayersModel: Model<PrayerDocument>,
  ) {
    super(prayersModel);
  }
}
