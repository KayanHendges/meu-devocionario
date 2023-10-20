import {
  LoginUserDTO,
  RegisterUserDTO,
  User,
  LoginResponse,
} from 'project-common';
import { JwtPayload } from '@auth/types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '@repositories/user/user.repository.interface';
import { IUserCredentialRepository } from '@repositories/userCredential/user.credential.repository.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: IUserRepository,
    private readonly userCredentialRepository: IUserCredentialRepository,
  ) {}

  async user({ id }: JwtPayload): Promise<User> {
    return this.userRepository.find({ id });
  }

  async register(user: RegisterUserDTO): Promise<User> {
    const { password, ...payload } = user;
    payload;

    const createdUser = await this.userRepository.create({
      ...payload,
      role: 'user',
    });

    try {
      await this.userCredentialRepository.create({
        userId: createdUser.id,
        password,
      });

      return createdUser;
    } catch (error) {
      await this.userRepository.delete({ id: createdUser.id });

      throw error;
    }
  }

  async login({ email, password }: LoginUserDTO): Promise<LoginResponse> {
    const [userFound] = await this.userRepository.list({
      where: { email, AND: { credentials: { some: { password } } } },
      pageSize: 1,
    });

    if (!userFound) throw new UnauthorizedException();

    const payload: JwtPayload = {
      id: userFound.id,
      role: userFound.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
