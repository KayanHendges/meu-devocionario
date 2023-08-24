import { Module } from '@nestjs/common';
import { PrismaUserCredentialRepository } from '@repositories/userCredential/implementations/prisma.user.credential.repository';
import { IUserCredentialRepository } from '@repositories/userCredential/user.credential.repository.interface';
@Module({
  controllers: [],
  providers: [
    {
      provide: IUserCredentialRepository,
      useClass: PrismaUserCredentialRepository,
    },
  ],
  exports: [IUserCredentialRepository],
})
export class UserCredentialRepositoryModule {}
