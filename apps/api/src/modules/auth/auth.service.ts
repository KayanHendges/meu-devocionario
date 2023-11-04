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
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: IUserRepository,
    private readonly userCredentialRepository: IUserCredentialRepository,
  ) {}

  async register(user: RegisterUserDTO): Promise<User> {
    const { password, ...payload } = user;
    const passwordHash = bcrypt.hashSync(password, 8);

    const createdUser = await this.userRepository.create({
      ...payload,
      role: 'user',
    });

    try {
      await this.userCredentialRepository.create({
        userId: createdUser.id,
        password: passwordHash,
      });

      return createdUser;
    } catch (error) {
      await this.userRepository.delete({ id: createdUser.id });

      throw error;
    }
  }

  async login({ email, password }: LoginUserDTO): Promise<LoginResponse> {
    const userFound = await this.userRepository.find({ email });

    const [credentialFound] = await this.userCredentialRepository.list({
      where: { userId: userFound.id },
      pageSize: 1,
    });

    if (!credentialFound || !credentialFound.password)
      throw new UnauthorizedException();

    const passwordMatch = bcrypt.compareSync(
      password,
      credentialFound.password,
    );

    if (!passwordMatch) throw new UnauthorizedException();

    const payload: JwtPayload = {
      id: userFound.id,
      role: userFound.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
