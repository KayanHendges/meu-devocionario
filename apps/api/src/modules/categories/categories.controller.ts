import { Public } from '@api/decorators/auth/public.route';
import { JwtPayload } from '@auth/types';
import {
  CreateCategoryDTO,
  ListCategoriesQueryDTO,
  UniqueCategoryParams,
  UpdateCategoryDTO,
} from '@categories/categories.dto';
import { CategoriesService } from '@categories/categories.service';
import { Claim } from '@decorators/claim/claim.decorator';
import { CurrentUser } from '@decorators/user/current.user.decorator';
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

  @Public()
  @Get()
  list(@Query() query: ListCategoriesQueryDTO) {
    return this.categoriesService.list(query);
  }

  @Public()
  @Get(':unique')
  find(@Param() { unique }: UniqueCategoryParams) {
    const uniqueParam = isObjectId(unique) ? { id: unique } : { name: unique };
    return this.categoriesService.find(uniqueParam);
  }

  @Claim('category.create')
  @Post()
  create(@Body() body: CreateCategoryDTO, @CurrentUser() user: JwtPayload) {
    return this.categoriesService.create(body, user);
  }

  @Claim('category.update')
  @Patch(':unique')
  update(
    @Param() { unique }: UniqueCategoryParams,
    @Body() body: UpdateCategoryDTO,
    @CurrentUser() user: JwtPayload,
  ) {
    const uniqueParam = isObjectId(unique) ? { id: unique } : { name: unique };
    return this.categoriesService.update(uniqueParam, body, user);
  }

  @Claim('category.delete')
  @Delete(':unique')
  delete(@Param() { unique }: UniqueCategoryParams) {
    const uniqueParam = isObjectId(unique) ? { id: unique } : { name: unique };
    return this.categoriesService.delete(uniqueParam);
  }
}
