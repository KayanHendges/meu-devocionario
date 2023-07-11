import { FindCategoryParamDTO } from '@categories/categories.dto';
import { CategoriesService } from '@categories/categories.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  list() {
    return this.categoriesService.list();
  }

  @Get('/:name')
  find(@Param() param: FindCategoryParamDTO) {
    return this.categoriesService.find(param.name);
  }
}
