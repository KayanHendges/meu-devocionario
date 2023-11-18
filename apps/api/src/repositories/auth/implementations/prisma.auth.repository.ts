import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '@providers/prisma/prisma.provider';
import { PrismaBaseRepository } from '@repositories/base/prisma/prisma.abstract.repository';
import {
  DeleteManyValidationCodeParams,
  DeleteManyValidationCodeResult,
  IAuthRepository,
  ValidationCodePayload,
} from '@repositories/auth/auth.repository.interface';
import { ValidationCode } from 'database';

@Injectable()
export class PrismaAuthRepository
  extends PrismaBaseRepository
  implements IAuthRepository
{
  constructor(private prisma: PrismaProvider) {
    super();
  }

  createValidationCode(
    payload: ValidationCodePayload,
  ): Promise<ValidationCode> {
    return this.prisma.validationCode.create({
      data: { ...payload, active: true },
    });
  }

  getValidationCode(payload: ValidationCodePayload): Promise<ValidationCode> {
    return this.prisma.validationCode.findFirstOrThrow({ where: payload });
  }

  invalidadeCode(
    where: DeleteManyValidationCodeParams,
  ): Promise<DeleteManyValidationCodeResult> {
    return this.prisma.validationCode.updateMany({
      where,
      data: { active: false },
    });
  }
}
