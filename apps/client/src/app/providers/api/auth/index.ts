import { CacheConfig, api } from "@providers/api";
import {
  LoginResponse,
  LoginUserDTO,
  RegisterUserDTO,
  User,
} from "project-common";

class AuthProvider {
  login = async (payload: LoginUserDTO, options?: CacheConfig): Promise<LoginResponse> =>
    (await api.post("auth/login", payload, options)).data;

  register = async (payload: RegisterUserDTO, options?: CacheConfig): Promise<User> =>
    (await api.post("auth/register", payload, options)).data;
}

export const authProvider = new AuthProvider();
