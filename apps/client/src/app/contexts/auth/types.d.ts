import { LoginUserDTO } from "project-common";

interface IAuthContext {
  isAuthenticated: boolean;
  signIn(payload: LoginUserDTO): Promise<void>;
  signOut(): Promise<void>;
}
