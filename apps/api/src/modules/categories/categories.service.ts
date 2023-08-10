import { ResponseList } from 'project-types';
import {
  CreateCategoryDTO,
  UniqueCategoryParams,
  ListCategoriesQueryDTO,
  UpdateCategoryDTO,
} from '@categories/categories.dto';
import { Category } from '@entities/category';
import { mapQueryToService } from '@global/utils.ts/service';
import { Inject, Injectable } from '@nestjs/common';
import { ICategoriesRepository } from '@repositories/categories/categories.repository.interface';
import { stripHtml } from '@global/utils.ts/formatters';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('ICategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  async list(params: ListCategoriesQueryDTO): Promise<ResponseList<Category>> {
    const query = mapQueryToService(params);
    const { page, pageSize, where } = query;

    const list = await this.categoriesRepository.list(query);
    const count =
      list.length <= query.pageSize
        ? list.length
        : await this.categoriesRepository.count(where);

    return { list, count, page, pageSize };
  }

  async find(params: UniqueCategoryParams): Promise<Category> {
    return this.categoriesRepository.find(params);
  }

  async create(payload: CreateCategoryDTO): Promise<any> {
    const category = new Category(payload);
    return this.categoriesRepository.create(category);
  }

  async update(params: UniqueCategoryParams, payload: UpdateCategoryDTO) {
    const category: Partial<Category> = payload;

    if (category.description)
      category.cleanDescription = stripHtml(category.description);

    return this.categoriesRepository.update(params, payload);
  }

  async delete(params: UniqueCategoryParams): Promise<Category> {
    return this.categoriesRepository.delete(params);
  }
}
