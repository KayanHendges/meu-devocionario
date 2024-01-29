import { CacheConfig, api } from "@/providers/api";
import { UserPrayer } from "database";
import { IncludeUserPrayerDTO, Prayer, User } from "project-common";

class UserProvider {
  getUser = async (options?: CacheConfig): Promise<User> =>
    (await api.get("user", options)).data;

  listUserPrayers = async (options?: CacheConfig): Promise<Prayer[]> =>
    (await api.get("user/prayers", options)).data;

  includePrayer = async (
    payload: IncludeUserPrayerDTO,
    options?: CacheConfig
  ): Promise<UserPrayer> =>
    (await api.post("user/prayers", payload, options)).data;

  removePrayer = async (
    prayerId: string,
    options?: CacheConfig
  ): Promise<UserPrayer> =>
    (await api.delete(`user/prayers/${prayerId}`, options)).data;
}

export const userProvider = new UserProvider();
