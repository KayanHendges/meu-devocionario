import { api } from "@providers/api";
import {
  LoginResponse,
  LoginUserDTO,
  RegisterUserDTO,
  User,
} from "project-common";

class AuthProvider {
  getUser = async (): Promise<User> => (await api.get("auth/user")).data;

  login = async (payload: LoginUserDTO): Promise<LoginResponse> =>
    (await api.post("auth", payload)).data;

  register = async (payload: RegisterUserDTO): Promise<User> =>
    (await api.post("auth", payload)).data;
}

export const authProvider = new AuthProvider();
