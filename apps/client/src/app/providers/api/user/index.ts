import { api } from "@providers/api";
import { User } from "project-common";

class UserProvider {
  getUser = async (): Promise<User> => (await api.get("user")).data;
}

export const userProvider = new UserProvider();
