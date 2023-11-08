import { JwtPayload } from '@auth/types';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IPrayerRepository } from '@repositories/prayer/prayer.repository.interface';
import { IUserRepository } from '@repositories/user/user.repository.interface';
import { IUserPrayerRepository } from '@repositories/userPrayer/user.prayer.repository.interface';
import { IncludeUserPrayerDTO, RemoveUserPrayerDTO } from 'project-common';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userPrayerRepository: IUserPrayerRepository,
    private readonly prayerRepository: IPrayerRepository,
  ) {}

  async getUser({ id }: JwtPayload) {
    return this.userRepository.find({ id });
  }

  async getPrayers({ id }: JwtPayload) {
    return this.prayerRepository.list({
      where: { userPrayers: { every: { userId: id } } },
    });
  }

  async includePrayer({ id }: JwtPayload, { prayerId }: IncludeUserPrayerDTO) {
    const [isAlreadyIncluded] = await this.userPrayerRepository.list({
      where: { userId: id, prayerId },
      pageSize: 1,
    });

    if (isAlreadyIncluded) throw new ConflictException();

    return this.userPrayerRepository.include({ userId: id, prayerId });
  }

  async removePrayer({ id }: JwtPayload, { prayerId }: RemoveUserPrayerDTO) {
    const [userPrayer] = await this.userPrayerRepository.list({
      where: { userId: id, prayerId },
      pageSize: 1,
    });

    if (!userPrayer) throw new NotFoundException();

    return this.userPrayerRepository.delete({ id: userPrayer.id });
  }
}
