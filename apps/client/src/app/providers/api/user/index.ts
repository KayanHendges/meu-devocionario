import { api } from "@providers/api";
import { UserPrayer } from "database";
import { IncludeUserPrayerDTO, Prayer, User } from "project-common";

class UserProvider {
  getUser = async (): Promise<User> => (await api.get("user")).data;

  listUserPrayers = async (): Promise<Prayer[]> =>
    (await api.get("user/prayers")).data;

  includePrayer = async (payload: IncludeUserPrayerDTO): Promise<UserPrayer> =>
    (await api.post("user/prayers", payload)).data;

  removePrayer = async (prayerId: string): Promise<UserPrayer> =>
    (await api.delete(`user/prayers/${prayerId}`)).data;
}

export const userProvider = new UserProvider();
