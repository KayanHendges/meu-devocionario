import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '@providers/prisma/prisma.provider';
import { PrismaBaseRepository } from '@repositories/base/prisma/prisma.abstract.repository';
import {
  IFindUserPrayerParams,
  IListUserPrayerParams,
  IUserPrayerRepository,
  IncludeUserPrayerPayload,
} from '@repositories/userPrayer/user.prayer.repository.interface';
import { UserPrayer } from 'database';

@Injectable()
export class PrismaUserPrayerRepository
  extends PrismaBaseRepository
  implements IUserPrayerRepository
{
  constructor(private prisma: PrismaProvider) {
    super();
  }

  async list({
    where,
    orderBy,
    page,
    pageSize,
  }: IListUserPrayerParams): Promise<UserPrayer[]> {
    return this.prisma.userPrayer.findMany({
      where,
      orderBy,
      ...this.mapPagination({ page, pageSize }),
    });
  }

  async count({ where }: IListUserPrayerParams): Promise<number> {
    return this.prisma.userPrayer.count({ where });
  }

  async include({
    prayerId,
    userId,
  }: IncludeUserPrayerPayload): Promise<UserPrayer> {
    return this.prisma.userPrayer.create({ data: { userId, prayerId } });
  }

  async delete(params: IFindUserPrayerParams): Promise<UserPrayer> {
    return this.prisma.userPrayer.delete({ where: params });
  }
}
