import { api } from "@providers/api";
import { Prayer, ResponseList } from "project-types";

class PrayersProviders {
  listPrayers = async () =>
    (await api.get<ResponseList<Prayer>>("prayers")).data;

  getPrayer = async (prayerUnique: string) =>
    (await api.get<Prayer>(`prayers/${prayerUnique}`)).data;
}

export const prayersProviders = new PrayersProviders();
