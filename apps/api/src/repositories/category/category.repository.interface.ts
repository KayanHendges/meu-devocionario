import { Prisma, Category } from '@prisma/client';
import { IPrismaListParams } from '@repositories/types';

export type IListCategoryParams = IPrismaListParams<
  Category,
  Prisma.CategoryWhereInput
>;
export type IFindCategoryParams = Prisma.CategoryWhereUniqueInput;
export type ICreateCategoryPayload = Prisma.CategoryCreateInput;
export type IUpdateCategoryPayload = Prisma.CategoryUpdateInput;

export abstract class ICategoryRepository {
  abstract list(params: IListCategoryParams): Promise<Category[]>;

  abstract find(params: IFindCategoryParams): Promise<Category>;

  abstract create(payload: ICreateCategoryPayload): Promise<Category>;

  abstract count(params: IListCategoryParams): Promise<number>;

  abstract update(
    params: IFindCategoryParams,
    payload: IUpdateCategoryPayload,
  ): Promise<Category>;

  abstract delete(params: IFindCategoryParams): Promise<Category>;
}
