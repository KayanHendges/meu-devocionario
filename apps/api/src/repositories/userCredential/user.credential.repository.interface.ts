import { Prisma, UserCredential } from 'database';
import { IPrismaListParams } from '@repositories/types';

export type IListUserCredentialParams = IPrismaListParams<
  UserCredential,
  Prisma.UserCredentialWhereInput
>;
export type IFindUserCredentialParams = Prisma.UserCredentialWhereUniqueInput;
export type ICreateUserCredentialPayload = Prisma.UserCredentialCreateInput;
export type IUpdateUserCredentialPayload = Prisma.UserCredentialUpdateInput;

export abstract class IUserCredentialRepository {
  abstract list(params: IListUserCredentialParams): Promise<UserCredential[]>;

  abstract find(params: IFindUserCredentialParams): Promise<UserCredential>;

  abstract count(params: IListUserCredentialParams): Promise<number>;

  abstract create(
    payload: ICreateUserCredentialPayload,
  ): Promise<UserCredential>;

  abstract update(
    params: IFindUserCredentialParams,
    payload: IUpdateUserCredentialPayload,
  ): Promise<UserCredential>;

  abstract delete(params: IFindUserCredentialParams): Promise<UserCredential>;
}
