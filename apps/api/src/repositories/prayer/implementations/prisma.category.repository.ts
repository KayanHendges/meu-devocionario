import { Injectable } from '@nestjs/common';
import { Prayer } from 'database';
import { PrismaProvider } from '@providers/prisma/prisma.provider';
import { PrismaBaseRepository } from '@repositories/base/prisma/prisma.abstract.repository';
import {
  ICreatePrayerPayload,
  IFindPrayerParams,
  IListPrayerParams,
  IPrayerRepository,
  IUpdatePrayerPayload,
} from '@repositories/prayer/prayer.repository.interface';

@Injectable()
export class PrismaPrayerRepository
  extends PrismaBaseRepository
  implements IPrayerRepository
{
  constructor(private prisma: PrismaProvider) {
    super();
  }

  async list({
    where,
    orderBy,
    page,
    pageSize,
  }: IListPrayerParams): Promise<Prayer[]> {
    return this.prisma.prayer.findMany({
      where,
      orderBy,
      ...this.mapPagination({ page, pageSize }),
    });
  }

  async find(params: IFindPrayerParams): Promise<Prayer> {
    return this.prisma.prayer.findUniqueOrThrow({ where: params });
  }

  async count({ where }: IListPrayerParams): Promise<number> {
    return this.prisma.prayer.count({ where });
  }

  async create(payload: ICreatePrayerPayload): Promise<Prayer> {
    return this.prisma.prayer.create({ data: payload });
  }

  async update(
    params: IFindPrayerParams,
    payload: IUpdatePrayerPayload,
  ): Promise<Prayer> {
    return this.prisma.prayer.update({ where: params, data: payload });
  }

  async delete(params: IFindPrayerParams): Promise<Prayer> {
    return this.prisma.prayer.delete({ where: params });
  }
}
