import { FindCategoryParamDTO } from '@categories/categories.dto';
import { Category } from '@entities/category';
import { Inject, Injectable } from '@nestjs/common';
import { ICategoriesRepository } from '@repositories/categories/categories.repository.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('ICategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  async list(): Promise<Category[]> {
    return this.categoriesRepository.list();
  }

  async find(name: FindCategoryParamDTO['name']): Promise<Category> {
    return this.categoriesRepository.find({ name });
  }
}
