import { Prisma, Prayer } from '@prisma/client';
import { IPrismaListParams } from '@repositories/types';

export type IListPrayerParams = IPrismaListParams<
  Prayer,
  Prisma.PrayerWhereInput
>;
export type IFindPrayerParams = Prisma.PrayerWhereUniqueInput;
export type ICreatePrayerPayload = Prisma.PrayerCreateInput;
export type IUpdatePrayerPayload = Prisma.PrayerUpdateInput;

export abstract class IPrayerRepository {
  abstract list(params: IListPrayerParams): Promise<Prayer[]>;

  abstract find(params: IFindPrayerParams): Promise<Prayer>;

  abstract count(params: IListPrayerParams): Promise<number>;

  abstract create(payload: ICreatePrayerPayload): Promise<Prayer>;

  abstract update(
    params: IFindPrayerParams,
    payload: IUpdatePrayerPayload,
  ): Promise<Prayer>;

  abstract delete(params: IFindPrayerParams): Promise<Prayer>;
}
