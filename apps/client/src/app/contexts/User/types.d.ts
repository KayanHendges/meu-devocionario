import { User } from "project-common";

interface IUserContext {
  user: User | null;
  setUser(user: User): void;
  isFetchingUser: boolean;
}
