import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PaginationAndSortDTO, entityAuditCommonOmit } from "../globals";
import { Prayer } from "../../entities";
import { OmitClass, PartialClass } from "../../mappedClasses";

export class ListPrayersQueryDTO extends PaginationAndSortDTO<Prayer> {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}

export class CreatePrayerDTO extends OmitClass(Prayer, [
  "cleanBody",
  "cleanDescription",
  ...entityAuditCommonOmit,
]) {}

export class UpdatePrayerDTO extends PartialClass(CreatePrayerDTO) {}

export class UniquePrayerParams {
  @IsString()
  @IsNotEmpty()
  unique: string;
}

export type UniquePrayer =
  | {
      id: string;
    }
  | { title: string };
