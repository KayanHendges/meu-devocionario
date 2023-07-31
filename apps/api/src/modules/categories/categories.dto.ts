import { Category } from '@entities/category';
import { PaginationAndSortDTO } from '@global/dto';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { PartialType, PickType } from '@nestjs/mapped-types';

export class CreateCategoryDTO extends PickType(Category, [
  'name',
  'description',
]) {}

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {}

export class ListCategoriesQueryDTO extends PaginationAndSortDTO<Category> {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}

export class UniqueCategoryParams extends PartialType(
  PickType(Category, ['id', 'name']),
) {}
