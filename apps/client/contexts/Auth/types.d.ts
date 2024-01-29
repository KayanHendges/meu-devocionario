import { LoginCodeDTO, LoginUserDTO } from "project-common";

interface IAuthContext {
  isAuthenticated?: boolean;
  signIn(payload: LoginUserDTO): Promise<void>;
  signInEmailCode(payload: LoginCodeDTO): Promise<void>;
  signOut(): Promise<void>;
}
