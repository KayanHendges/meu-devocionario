import { CacheConfig, api } from "@providers/api";
import {
  LoginResponse,
  LoginUserDTO,
  RegisterUserDTO,
  RequestCodeDTO,
  User,
  LoginCodeDTO,
} from "project-common";

class AuthProvider {
  login = async (payload: LoginUserDTO): Promise<LoginResponse> =>
    (await api.post("auth/login", payload)).data;

  register = async (payload: RegisterUserDTO): Promise<User> =>
    (await api.post("auth/register", payload)).data;

  requestCode = async (payload: RequestCodeDTO): Promise<void> =>
    (await api.post("auth/requestCode", payload)).data;

  loginCode = async (payload: LoginCodeDTO): Promise<void> =>
    (await api.post("auth/loginCode", payload)).data;
}

export const authProvider = new AuthProvider();
