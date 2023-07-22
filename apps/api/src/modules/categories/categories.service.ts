import { ResponseList } from 'project-types';
import {
  CreateCategoryDTO,
  FindCategoryParams,
  ListCategoriesQueryDTO,
  UpdateCategoryDTO,
  UpdateCategoryParams,
} from '@categories/categories.dto';
import { Category } from '@entities/category';
import { mapQueryToService } from '@global/utils.ts/service';
import { Inject, Injectable } from '@nestjs/common';
import { ICategoriesRepository } from '@repositories/categories/categories.repository.interface';

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

  async find(params: FindCategoryParams): Promise<Category> {
    return this.categoriesRepository.find(params);
  }

  async create(payload: CreateCategoryDTO): Promise<any> {
    const category = new Category(payload);
    return this.categoriesRepository.create(payload);
  }

  async update(params: UpdateCategoryParams, payload: UpdateCategoryDTO) {
    return this.categoriesRepository.update(params, payload);
  }

  async delete(params: FindCategoryParams): Promise<Category> {
    return this.categoriesRepository.delete(params);
  }
}
