import { Prayer } from '@entities/prayer';
import { PaginationAndSortDTO } from '@global/dto';
import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { IsDate, IsOptional, IsString } from 'class-validator';

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
  'id',
  'cleanBody',
  'cleanDescription',
  'updatedAt',
  'createdAt',
]) {}

export class UpdatePrayerDTO extends PartialType(CreatePrayerDTO) {}

export class FindPrayerParams extends PartialType(
  PickType(Prayer, ['id', 'title']),
) {}
