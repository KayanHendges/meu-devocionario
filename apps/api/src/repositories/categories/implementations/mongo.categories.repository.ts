import { Category } from '@entities/category';
import {
  ListParams,
  RepositoryCreateParams,
  RepositoryUpdateParams,
  WhereParams,
} from '@global/types/repository';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDocument } from '@providers/mongo/schemas/category.schema';
import { Prayer, PrayerDocument } from '@providers/mongo/schemas/prayer.schema';
import {
  CategoryUniqueParam,
  FindManyProperty,
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
    @InjectModel(Prayer.name)
    private readonly prayersModel: Model<PrayerDocument>,
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

  async findMany(
    categories: string[],
    property: FindManyProperty = 'id',
  ): Promise<Category[]> {
    const opa = { [property]: { $in: categories } };

    const list = await this.categoryModel
      .find({ _id: { $in: categories } })
      .lean();

    return list.map(mapMongoReturn);
  }

  async count(where?: WhereParams<Category>): Promise<number> {
    const count = await this.categoryModel.count(where || {});

    return count;
  }

  async create(payload: RepositoryCreateParams<Category>): Promise<Category> {
    const created = await this.categoryModel.create(payload);

    return mapMongoReturn(created.toJSON());
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

    const category = await this.categoryModel.findOne(params).lean();
    if (!category) throw new NotFoundException('Category not found');

    const prayersWith = await this.prayersModel.find({
      $or: [{ category: category._id }, { relatedCategories: category._id }],
    });

    if (prayersWith.length)
      throw new ConflictException(
        `You can't delete this category. There is ${prayersWith.length} items using this caregory.`,
      );

    await this.categoryModel.deleteOne({ _id: category._id }).lean();

    return mapMongoReturn(category);
  }
}
