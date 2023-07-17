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

export class FindCategoryParams extends PartialType(
  PickType(Category, ['id', 'name']),
) {}

export class UpdateCategoryParams extends PickType(Category, ['id']) {}

export class DeleteCategoryParams extends PickType(Category, ['id']) {}
