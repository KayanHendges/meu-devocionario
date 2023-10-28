import { JwtPayload } from '@auth/types';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@repositories/user/user.repository.interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getUser({ id }: JwtPayload) {
    return this.userRepository.find({ id });
  }
}
