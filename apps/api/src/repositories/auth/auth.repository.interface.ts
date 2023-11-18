import { Prisma, ValidationCode } from 'database';

export interface ValidationCodePayload {
  userId: string;
  code: string;
}

export type DeleteManyValidationCodeParams = Prisma.ValidationCodeWhereInput;
export type DeleteManyValidationCodeResult = Prisma.BatchPayload;

export abstract class IAuthRepository {
  abstract createValidationCode(
    payload: ValidationCodePayload,
  ): Promise<ValidationCode>;

  abstract getValidationCode(
    payload: ValidationCodePayload,
  ): Promise<ValidationCode>;

  abstract invalidadeCode(
    params: DeleteManyValidationCodeParams,
  ): Promise<DeleteManyValidationCodeResult>;
}
