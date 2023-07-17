import { Prayer } from '@entities/prayer';
import { PaginationAndSortDTO } from '@global/dto';
import { OmitType, PickType } from '@nestjs/mapped-types';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class ListPrayersQueryDTO extends PaginationAndSortDTO<Prayer> {
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

export class CreatePrayerDTO extends OmitType(Prayer, [
  'id',
  'updatedAt',
  'createdAt',
]) {}
