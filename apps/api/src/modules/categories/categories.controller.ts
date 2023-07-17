import {
  CreateCategoryDTO,
  FindCategoryParams,
  ListCategoriesQueryDTO,
  UpdateCategoryDTO,
  UpdateCategoryParams,
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
  find(@Param() { id }: FindCategoryParams) {
    const unique = isObjectId(id) ? { id } : { name: id };
    return this.categoriesService.find(unique);
  }

  @Post()
  create(@Body() body: CreateCategoryDTO) {
    return this.categoriesService.create(body);
  }

  @Patch(':id')
  update(
    @Param() param: UpdateCategoryParams,
    @Body() body: UpdateCategoryDTO,
  ) {
    return this.categoriesService.update(param, body);
  }

  @Delete(':id')
  delete(@Param() param: FindCategoryParams) {
    return this.categoriesService.delete(param);
  }
}
