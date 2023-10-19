import { Category } from "../../entities";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { OmitClass, PartialClass } from "../../mappedClasses";
import { PaginationAndSortDTO, entityAuditCommonOmit } from "../globals";

export class CreateCategoryDTO extends OmitClass(Category, [
  "cleanDescription",
  ...entityAuditCommonOmit,
]) {}

export class UpdateCategoryDTO extends PartialClass(CreateCategoryDTO) {}

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
