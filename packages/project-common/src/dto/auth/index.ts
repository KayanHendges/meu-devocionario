import { User } from "../../entities";
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { PickClass } from "../../mappedClasses";

export interface LoginResponse {
  accessToken: string;
}

export class RegisterUserDTO extends PickClass(User, ["name", "email"]) {
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password: string;
}

export class LoginUserDTO extends PickClass(RegisterUserDTO, [
  "email",
  "password",
]) {}

export class ResetPasswordDTO extends PickClass(RegisterUserDTO, ["password"]) {}

export class RequestCodeDTO extends PickClass(User, ["email"]) {}

export class LoginCodeDTO extends PickClass(User, ["email"]) {
  @IsString()
  @Matches(/^\d{6}$/)
  code: string;
}
