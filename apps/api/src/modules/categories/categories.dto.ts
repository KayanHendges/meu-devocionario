import { Category } from '@entities/category';
import { PaginationAndSortDTO } from '@global/dto';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';

export class CreateCategoryDTO extends OmitType(Category, [
  'id',
  'cleanDescription',
  'updatedAt',
  'createdAt',
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

export class UniqueCategoryParams {
  @IsString()
  @IsNotEmpty()
  unique: string;
}

export type UniqueCategory =
  | {
      id: string;
    }
  | { name: string };
