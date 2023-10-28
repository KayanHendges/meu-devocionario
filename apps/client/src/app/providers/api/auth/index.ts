import { api } from "@providers/api";
import {
  LoginResponse,
  LoginUserDTO,
  RegisterUserDTO,
  User,
} from "project-common";

class AuthProvider {
  login = async (payload: LoginUserDTO): Promise<LoginResponse> =>
    (await api.post("auth/login", payload)).data;

  register = async (payload: RegisterUserDTO): Promise<User> =>
    (await api.post("auth/register", payload)).data;
}

export const authProvider = new AuthProvider();
