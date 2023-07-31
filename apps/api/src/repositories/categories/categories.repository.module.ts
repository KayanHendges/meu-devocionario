import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Category,
  CategorySchema,
} from '@providers/mongo/schemas/category.schema';
import { Prayer, PrayerSchema } from '@providers/mongo/schemas/prayer.schema';
import { MongoCategoriesRepository } from '@repositories/categories/implementations/mongo.categories.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Prayer.name, schema: PrayerSchema },
    ]),
  ],
  providers: [
    { provide: 'ICategoriesRepository', useClass: MongoCategoriesRepository },
  ],
  exports: ['ICategoriesRepository'],
})
export class CategoriesRepositoryModule {}
