import {
  ListParams,
  RepositoryCreateParams,
  RepositoryUpdateParams,
  WhereParams,
} from '@global/types/repository';

type EntityUniqueParams<T, PK extends keyof T> = {
  [K in PK]?: T[K];
};

interface IBaseRepository<Entity, UniqueKeys extends keyof Entity> {
  list(params: ListParams<Entity>): Promise<Entity[]>;

  find(uniqueParam: EntityUniqueParams<Entity, UniqueKeys>): Promise<Entity>;

  count(param: WhereParams<Entity>): Promise<count>;

  create(payload: RepositoryCreateParams<Entity>): Promise<Entity>;

  update(
    uniqueParam: EntityUniqueParams<Entity, UniqueKeys>,
    payload: RepositoryUpdateParams<Entity>,
  ): Promise<Entity>;

  delete(uniqueParam: EntityUniqueParams<Entity, UniqueKeys>): Promise<Entity>;
}
