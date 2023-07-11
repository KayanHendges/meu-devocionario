import { Category } from '@entities/category';

interface FindCategoryParam {
  id?: Category['id'];
  name?: Category['name'];
}

interface ICategoriesRepository {
  list(): Promise<Category[]>;

  find(uniqueParam: FindCategoryParam): Promise<Category>;
}
