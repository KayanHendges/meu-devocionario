import {
  LoginUserDTO,
  RegisterUserDTO,
  User,
  LoginResponse,
  ValidateCodeDTO,
  RequestCodeDTO,
  ResetPasswordDTO,
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
import { config } from '@config/index';

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
    const passwordHash = this.generatePasswordHash(password);

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

    return this.generateToken(userFound);
  }

  async resetPassword(
    { password }: ResetPasswordDTO,
    { id }: JwtPayload,
  ): Promise<void> {
    const passwordHash = this.generatePasswordHash(password);

    await this.userCredentialRepository.update(
      { userId: id },
      { password: passwordHash },
    );

    return;
  }

  async requestCode({ email }: RequestCodeDTO): Promise<void> {
    const userFound = await this.userRepository.find({ email });
    await this.authRepository.invalidadeCode({ userId: userFound.id });

    const code = Math.random().toString().substring(2, 8);
    await this.authRepository.createValidationCode({
      userId: userFound.id,
      code,
    });

    await this.mailerService.sendMail({
      from: config.SMTP_EMAIL,
      to: userFound.email,
      subject: 'Seu código de verificação',
      html: `<h2>${code}</h2>`,
    });

    return;
  }

  async loginCode({ code, email }: ValidateCodeDTO): Promise<LoginResponse> {
    const user = await this.userRepository.find({ email });

    const foundCode = await this.authRepository.getValidationCode({
      code,
      userId: user.id,
    });

    if (!foundCode.active)
      throw new GoneException('Code is expired or inactivated');

    await this.authRepository.invalidadeCode({
      code: foundCode.code,
      userId: user.id,
    });

    return this.generateToken(user);
  }

  private generatePasswordHash(password: string): string {
    return bcrypt.hashSync(password, 8);
  }

  private async generateToken({ id, role }: User): Promise<LoginResponse> {
    const payload: JwtPayload = {
      id,
      role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
