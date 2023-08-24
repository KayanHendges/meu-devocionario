import {
  CreateCategoryDTO,
  ListCategoriesQueryDTO,
  UniqueCategoryParams,
  UpdateCategoryDTO,
} from '@categories/categories.dto';
import { CategoriesService } from '@categories/categories.service';
import { isObjectId } from '@global/utils.ts/regexValidate';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  list(@Query() query: ListCategoriesQueryDTO) {
    return this.categoriesService.list(query);
  }

  @Get('/:id')
  find(@Param() { unique }: UniqueCategoryParams) {
    const uniqueParam = isObjectId(unique) ? { id: unique } : { name: unique };
    return this.categoriesService.find(uniqueParam);
  }

  @Post()
  create(@Body() body: CreateCategoryDTO) {
    return this.categoriesService.create(body);
  }

  @Patch(':id')
  update(
    @Param() { unique }: UniqueCategoryParams,
    @Body() body: UpdateCategoryDTO,
  ) {
    const uniqueParam = isObjectId(unique) ? { id: unique } : { name: unique };
    return this.categoriesService.update(uniqueParam, body);
  }

  @Delete(':id')
  delete(@Param() { unique }: UniqueCategoryParams) {
    const uniqueParam = isObjectId(unique) ? { id: unique } : { name: unique };
    return this.categoriesService.delete(uniqueParam);
  }
}
