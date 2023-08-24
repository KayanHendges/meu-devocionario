import { PaginationAndSortDTO } from '@global/dto';
import { ListParams, WhereParams } from '@repositories/types';

type Query<T extends Record<keyof T, any>> = PaginationAndSortDTO<T> &
  Partial<T>;

export const mapQueryToService = <T extends Record<keyof T, any>>({
  orderBy,
  page,
  pageSize,
  ...where
}: Query<T>): Required<ListParams<T>> => {
  return { orderBy, page, pageSize, where: where as WhereParams<T> };
};
