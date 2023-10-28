import { User } from "../../entities";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
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

export class LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
