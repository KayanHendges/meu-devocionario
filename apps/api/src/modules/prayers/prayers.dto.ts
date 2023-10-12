import { Prayer } from '@entities/prayer';
import { PaginationAndSortDTO } from '@global/dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { entityAuditCommonOmit, entityCommonOmit } from '@utils/dto';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

export class CreatePrayerDTO extends OmitType(Prayer, [
  'cleanBody',
  'cleanDescription',
  ...entityAuditCommonOmit,
]) {}

export class UpdatePrayerDTO extends PartialType(CreatePrayerDTO) {}

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
