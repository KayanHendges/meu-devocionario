import { OrderBy, OrderParam } from '@repositories/types';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsObject, IsOptional, IsPositive, Max } from 'class-validator';

type OrderByObject<T> = Record<keyof T, OrderBy>;

export function orderByFromString<T extends Record<keyof T, any>>(
  param: string,
): OrderByObject<T> | string {
  const splitted = param.split('_');
  const key = splitted[0].length ? splitted[0] : null;
  const direction = splitted[1]?.length ? splitted[1] : 'asc';

  if (!key) return '';

  if (!['asc', 'desc'].includes(direction)) return '';

  return { [key]: direction } as OrderByObject<T>;
}

export class PaginationAndSortDTO<T> {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  public page = 1;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Max(1000)
  @Type(() => Number)
  public pageSize = 100;

  @IsOptional()
  @IsObject({
    message:
      'orderBy must have the following format: key_direction(asc or desc)',
  })
  @Transform((value) => orderByFromString<T>(value.value))
  orderBy: OrderParam<T>;
}
