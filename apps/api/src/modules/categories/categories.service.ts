import { ResponseList } from 'project-common';
import {
  CreateCategoryDTO,
  UniqueCategory,
  ListCategoriesQueryDTO,
  UpdateCategoryDTO,
} from '@categories/categories.dto';
import { Category } from '@entities/category';
import { mapQueryToService } from '@global/utils.ts/service';
import { Injectable } from '@nestjs/common';
import { stripHtml } from '@global/utils.ts/formatters';
import { ICategoryRepository } from '@repositories/category/category.repository.interface';
import { JwtPayload } from '@auth/types';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async list(params: ListCategoriesQueryDTO): Promise<ResponseList<Category>> {
    const query = mapQueryToService(params);
    const { page, pageSize, where } = query;

    const list = await this.categoryRepository.list(query);
    const count =
      list.length <= query.pageSize
        ? list.length
        : await this.categoryRepository.count({ where });

    return { list, count, page, pageSize };
  }

  async find(params: UniqueCategory): Promise<Category> {
    return this.categoryRepository.find(params);
  }

  async create(payload: CreateCategoryDTO, user: JwtPayload): Promise<any> {
    const category = new Category({
      ...payload,
      createdBy: user.id,
      lastUpdatedBy: user.id,
    });

    return this.categoryRepository.create(category);
  }

  async update(
    params: UniqueCategory,
    payload: UpdateCategoryDTO,
    user: JwtPayload,
  ) {
    const dbCategory = await this.categoryRepository.find(params);
    const { id, ...category } = new Category({
      ...dbCategory,
      ...payload,
      lastUpdatedBy: user.id,
    });

    return this.categoryRepository.update({ id }, category);
  }

  async delete(params: UniqueCategory): Promise<Category> {
    return this.categoryRepository.delete(params);
  }
}
