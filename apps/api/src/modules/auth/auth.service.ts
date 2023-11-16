import {
  LoginUserDTO,
  RegisterUserDTO,
  User,
  LoginResponse,
  ValidateCodeDTO,
} from 'project-common';
import { JwtPayload } from '@auth/types';
import {
  GoneException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '@repositories/user/user.repository.interface';
import { IUserCredentialRepository } from '@repositories/userCredential/user.credential.repository.interface';
import * as bcrypt from 'bcrypt';
import { IAuthRepository } from '@repositories/auth/auth.repository.interface';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: IUserRepository,
    private readonly authRepository: IAuthRepository,
    private readonly userCredentialRepository: IUserCredentialRepository,
    private readonly mailerService: MailerService,
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

  async requestCode({ id }: JwtPayload): Promise<void> {
    const { email } = await this.userRepository.find({ id });
    await this.authRepository.invalidadeCode({ userId: id });

    const code = Math.random().toString().substring(2, 8);
    await this.authRepository.createValidationCode({ userId: id, code });

    await this.mailerService
      .sendMail({
        from: 'naoresponda@meudevocionario.com.br',
        to: email,
        subject: 'Seu código de verificação',
        html: `<h2>${code}</h2>`,
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });

    return;
  }

  async validateCode(
    { code }: ValidateCodeDTO,
    { id }: JwtPayload,
  ): Promise<void> {
    const foundCode = await this.authRepository.getValidationCode({
      code,
      userId: id,
    });

    if (!foundCode.active)
      throw new GoneException('Code is expired or inactivated');

    await this.authRepository.invalidadeCode({
      code: foundCode.code,
      userId: id,
    });

    return;
  }
}
