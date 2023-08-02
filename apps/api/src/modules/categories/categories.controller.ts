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
  find(@Param() { id }: UniqueCategoryParams) {
    const unique = isObjectId(id) ? { id } : { name: id };
    return this.categoriesService.find(unique);
  }

  @Post()
  create(@Body() body: CreateCategoryDTO) {
    return this.categoriesService.create(body);
  }

  @Patch(':id')
  update(
    @Param() { id }: UniqueCategoryParams,
    @Body() body: UpdateCategoryDTO,
  ) {
    const unique = isObjectId(id) ? { id } : { name: id };
    return this.categoriesService.update(unique, body);
  }

  @Delete(':id')
  delete(@Param() { id }: UniqueCategoryParams) {
    const unique = isObjectId(id) ? { id } : { name: id };
    return this.categoriesService.delete(unique);
  }
}
