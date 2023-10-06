import { User } from '@entities/user';
import { OmitType } from '@nestjs/mapped-types';
import { entityCommonOmit } from '@utils/dto';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDTO extends OmitType(User, [
  ...entityCommonOmit,
  'role',
]) {
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password: string;
}

export class LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
