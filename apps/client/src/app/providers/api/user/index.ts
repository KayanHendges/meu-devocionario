import { api } from "@providers/api";
import { UserPrayer } from "database";
import { IncludeUserPrayerDTO, User } from "project-common";

class UserProvider {
  getUser = async (): Promise<User> => (await api.get("user")).data;

  listUserPrayers = async (): Promise<UserPrayer[]> =>
    (await api.get("users/prayers")).data;

  includePrayer = async (payload: IncludeUserPrayerDTO): Promise<UserPrayer> =>
    (await api.post("users/prayers", payload)).data;

  removePrayer = async (prayerId: string): Promise<UserPrayer> =>
    (await api.delete(`users/prayers/${prayerId}`)).data;
}

export const userProvider = new UserProvider();
