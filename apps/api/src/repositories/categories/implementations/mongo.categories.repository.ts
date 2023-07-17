import { Category } from '@entities/category';
import {
  ListParams,
  RepositoryCreateParams,
  RepositoryUpdateParams,
  WhereParams,
} from '@global/types/repository';
import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDocument } from '@providers/mongo/schemas/category.schema';
import {
  CategoryUniqueParam,
  ICategoriesRepository,
} from '@repositories/categories/categories.repository.interface';
import {
  mapMongoListParams,
  mapMongoParams,
  mapMongoReturn,
} from '@repositories/helper';
import { Model } from 'mongoose';

export class MongoCategoriesRepository implements ICategoriesRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}
  async list(params: ListParams<Category>): Promise<Category[]> {
    const { filter, pagination, sort } = mapMongoListParams(params);

    const list = await this.categoryModel
      .find(filter, null, pagination)
      .sort(sort)
      .lean();

    return list.map(mapMongoReturn);
  }

  async find(uniqueParam: CategoryUniqueParam): Promise<Category> {
    const params = mapMongoParams(uniqueParam);

    const category = await this.categoryModel.findOne(params).lean();
    if (!category) throw new NotFoundException('Category not found');

    return mapMongoReturn(category);
  }

  async findMany(categories: string[]): Promise<Category[]> {
    const list = await this.categoryModel
      .find({ name: { $in: categories } })
      .lean();

    return list.map(mapMongoReturn);
  }

  async count(where?: WhereParams<Category>): Promise<number> {
    const count = await this.categoryModel.count(where || {});

    return count;
  }

  async create(payload: RepositoryCreateParams<Category>): Promise<Category> {
    const createdAt = await this.categoryModel.create(payload);

    return mapMongoReturn(createdAt.toJSON());
  }

  async update(
    uniqueParam: CategoryUniqueParam,
    payload: RepositoryUpdateParams<Category>,
  ): Promise<Category> {
    const params = mapMongoParams(uniqueParam);

    const updated = await this.categoryModel.findOneAndUpdate(params, payload, {
      new: true,
    });

    if (!updated) throw new NotFoundException('Category not found');

    return mapMongoReturn(updated.toObject());
  }

  async delete(uniqueParam: CategoryUniqueParam): Promise<Category> {
    const params = mapMongoParams(uniqueParam);

    const category = await this.categoryModel.findOneAndDelete(params).lean();
    if (!category) throw new NotFoundException('Category not found');

    return mapMongoReturn(category);
  }
}
