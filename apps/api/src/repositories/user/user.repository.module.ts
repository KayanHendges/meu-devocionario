import { User } from '@entities/user';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '@providers/mongo/schemas/user.schema';
import { MongoUserRepository } from '@repositories/user/implementations/mongo.user.repository';
import { IUserRepository } from '@repositories/user/user.repository.interface';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [],
  providers: [
    {
      provide: IUserRepository,
      useClass: MongoUserRepository,
    },
  ],
  exports: [IUserRepository],
})
export class ClientRepositoryModule {}
