import { Category } from '@entities/category';
import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDocument } from '@providers/mongo/schemas/category.schema';
import {
  FindCategoryParam,
  ICategoriesRepository,
} from '@repositories/categories/categories.repository.interface';
import { mapMongoParams, mapMongoReturn } from '@repositories/helper';
import { Model } from 'mongoose';

export class MongoCategoriesRepository implements ICategoriesRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}
  async list(): Promise<Category[]> {
    const list = await this.categoryModel.find().lean();
    return list.map(mapMongoReturn);
  }

  async find(uniqueParam: FindCategoryParam): Promise<Category> {
    const params = mapMongoParams(uniqueParam);

    const category = await this.categoryModel.findOne(params).lean();
    if (!category) throw new NotFoundException('Category not found');

    return mapMongoReturn(category);
  }
}
