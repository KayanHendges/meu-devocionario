import { User } from '@entities/user';
import {
  EntityUniqueParams,
  IBaseRepository,
} from '@repositories/base/base.interface.repository';

export type UserUniqueKeys = 'id' | 'email';

export type UserUniqueParams = EntityUniqueParams<User, UserUniqueKeys>;

export abstract class IUserRepository extends IBaseRepository<
  User,
  UserUniqueKeys
> {}
