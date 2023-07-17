import { ListParams, OrderParam, WhereParams } from '@global/types/repository';
import { FilterQuery, SortOrder, Types } from 'mongoose';

export interface MongoReturnProperties {
  __v?: any;
  _id: Types.ObjectId;
}

type MongoSortEntity<T> = Partial<Omit<Record<keyof T, SortOrder>, 'id'>> & {
  _id?: SortOrder;
};

interface PaginationParams {
  page?: number;
  pageSize?: number;
}

interface MongoPaginationParams {
  limit?: number;
  skip?: number;
}

interface MongoParamsMapped<T> {
  filter: FilterQuery<T>;
  pagination: MongoPaginationParams;
  sort: MongoSortEntity<T>;
}

export const mapMongoFilter = <T>(where: WhereParams<T>): FilterQuery<T> => {
  return Object.entries(where).reduce((prev, [key, value]) => {
    if (typeof value === 'undefined' || value === 'undefined') return prev;
    const queryValue =
      value === 'null'
        ? null
        : typeof value === 'string'
        ? { $regex: new RegExp(value, 'i') }
        : value;
    return { ...prev, [key as string]: queryValue };
  }, {});
};

export const mapMongoReturn = <
  T extends MongoReturnProperties & Record<string, any>,
>(
  object: T,
): Omit<T, keyof MongoReturnProperties> & { id: string } => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...obj } = object;

  return { ...obj, id: _id.toString() };
};

export const mapMongoParams = <
  T extends Record<string, any> & { id?: string },
>({
  id,
  ...params
}: T): Omit<T, 'id'> & { _id?: string } => {
  if (id) return { ...params, _id: id };
  return params;
};

export const mapMongoPagination = ({
  page = 1,
  pageSize,
}: PaginationParams): MongoPaginationParams => {
  return {
    limit: pageSize,
    ...(pageSize && page ? { skip: (page - 1) * pageSize } : {}),
  };
};

export const mapMongoSort = <T>(
  orderBy?: OrderParam<T>,
): MongoSortEntity<T> => {
  const sort: MongoSortEntity<T> = {};

  Object.entries(orderBy || {}).forEach(([key, value]) => {
    const sortKey = key === 'id' ? '_id' : key;
    if (value === 'asc') sort[sortKey] = 1;
    if (value === 'desc') sort[sortKey] = -1;
  });

  return sort;
};

export const mapMongoListParams = <T>({
  orderBy,
  page,
  pageSize,
  where,
}: ListParams<T>): MongoParamsMapped<T> => {
  return {
    filter: mapMongoFilter(where || {}),
    pagination: mapMongoPagination({ page, pageSize }),
    sort: mapMongoSort(orderBy),
  };
};
