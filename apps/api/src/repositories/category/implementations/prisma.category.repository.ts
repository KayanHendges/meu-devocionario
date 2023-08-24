import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaProvider } from '@providers/prisma/prisma.provider';
import { PrismaBaseRepository } from '@repositories/base/prisma/prisma.abstract.repository';
import {
  ICategoryRepository,
  ICreateCategoryPayload,
  IFindCategoryParams,
  IListCategoryParams,
  IUpdateCategoryPayload,
} from '@repositories/category/category.repository.interface';

@Injectable()
export class PrismaCategoryRepository
  extends PrismaBaseRepository
  implements ICategoryRepository
{
  constructor(private prisma: PrismaProvider) {
    super();
  }

  async list({
    where,
    orderBy,
    page,
    pageSize,
  }: IListCategoryParams): Promise<Category[]> {
    return this.prisma.category.findMany({
      where,
      orderBy,
      ...this.mapPagination({ page, pageSize }),
    });
  }

  async find(params: IFindCategoryParams): Promise<Category> {
    return this.prisma.category.findUniqueOrThrow({ where: params });
  }

  async count({ where }: IListCategoryParams): Promise<number> {
    return this.prisma.category.count({ where });
  }

  async create(payload: ICreateCategoryPayload): Promise<Category> {
    return this.prisma.category.create({ data: payload });
  }

  async update(
    params: IFindCategoryParams,
    payload: IUpdateCategoryPayload,
  ): Promise<Category> {
    return this.prisma.category.update({ where: params, data: payload });
  }

  async delete(params: IFindCategoryParams): Promise<Category> {
    return this.prisma.category.delete({ where: params });
  }
}
