import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Category,
  CategorySchema,
} from '@providers/mongo/schemas/category.schema';
import { MongoCategoriesRepository } from '@repositories/categories/implementations/mongo.categories.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [
    { provide: 'ICategoriesRepository', useClass: MongoCategoriesRepository },
  ],
  exports: ['ICategoriesRepository'],
})
export class CategoriesRepositoryModule {}
