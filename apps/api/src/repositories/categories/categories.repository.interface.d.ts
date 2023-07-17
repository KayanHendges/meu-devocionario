import { Category } from '@entities/category';
import {
  ListParams,
  RepositoryCreateParams,
  RepositoryUpdateParams,
  WhereParams,
} from '@global/types/repository';

interface CategoryUniqueParam {
  id?: Category['id'];
  name?: Category['name'];
}

interface ICategoriesRepository {
  list(params: ListParams<Category>): Promise<Category[]>;

  find(uniqueParam: CategoryUniqueParam): Promise<Category>;

  findMany(categories: string[]): Promise<Category[]>;

  count(param: WhereParams<Category>): Promise<count>;

  create(payload: RepositoryCreateParams<Category>): Promise<Category>;

  update(
    uniqueParam: CategoryUniqueParam,
    payload: RepositoryUpdateParams<Category>,
  ): Promise<Category>;

  delete(uniqueParam: CategoryUniqueParam): Promise<Category>;
}
