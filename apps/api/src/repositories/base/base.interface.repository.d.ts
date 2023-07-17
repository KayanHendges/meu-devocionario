import { Category } from '@entities/category';
import {
  ListParams,
  RepositoryCreateParams,
  RepositoryUpdateParams,
  WhereParams,
} from '@global/types/repository';

type EntityUniqueParams<Entity, ParamsKey extends keyof Entity> = {
  [K in keyof ParamsKey]: Entity[K];
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
