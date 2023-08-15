import { api } from "@providers/api";
import {
  CreatePrayerPayload,
  UpdatePrayerPayload,
} from "@providers/api/prayers/types";
import { Prayer, ResponseList } from "project-types";

class PrayersProviders {
  listPrayers = async () =>
    (await api.get<ResponseList<Prayer>>("prayers")).data;

  getPrayer = async (prayerUnique: string) =>
    (await api.get<Prayer>(`prayers/${prayerUnique}`)).data;

  createPrayer = async (payload: CreatePrayerPayload) =>
    (await api.patch<Prayer>("prayers", { payload })).data;

  updatePrayer = async (prayerUnique: string, payload: UpdatePrayerPayload) =>
    (await api.patch<Prayer>(`prayers/${prayerUnique}`, payload)).data;

  deletePrayer = async (prayerUnique: string) =>
    (await api.delete<Prayer>(`prayers/${prayerUnique}`)).data;
}

export const prayersProviders = new PrayersProviders();
