import { IPrismaListParams } from '@repositories/types';
import { Prisma, UserPrayer } from 'database';

export type IListUserPrayerParams = IPrismaListParams<
  UserPrayer,
  Prisma.UserPrayerWhereInput
>;

export type IFindUserPrayerParams = Prisma.UserPrayerWhereUniqueInput;

export interface IncludeUserPrayerPayload {
  userId: string;
  prayerId: string;
}

export abstract class IUserPrayerRepository {
  abstract list(params: IListUserPrayerParams): Promise<UserPrayer[]>;

  abstract count(params: IListUserPrayerParams): Promise<number>;

  abstract include(payload: IncludeUserPrayerPayload): Promise<UserPrayer>;

  abstract delete(params: IFindUserPrayerParams): Promise<UserPrayer>;
}
