import { Module } from '@nestjs/common';
import { PrismaProvider } from '@providers/prisma/prisma.provider';
import { IAuthRepository } from '@repositories/auth/auth.repository.interface';
import { PrismaAuthRepository } from '@repositories/auth/implementations/prisma.auth.repository';
@Module({
  controllers: [],
  providers: [
    PrismaProvider,
    {
      provide: IAuthRepository,
      useClass: PrismaAuthRepository,
    },
  ],
  exports: [IAuthRepository],
})
export class AuthRepositoryModule {}
