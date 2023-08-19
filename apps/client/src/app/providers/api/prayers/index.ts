import { api } from "@providers/api";
import {
  ICreatePrayerPayload,
  IListPrayersParams,
  IUpdatePrayerPayload,
} from "@providers/api/prayers/types";
import { Prayer, ResponseList } from "project-types";

class PrayersProviders {
  listPrayers = async (params?: IListPrayersParams) =>
    (await api.get<ResponseList<Prayer>>("prayers", { params })).data;

  getPrayer = async (prayerUnique: string) =>
    (await api.get<Prayer>(`prayers/${prayerUnique}`)).data;

  createPrayer = async (payload: ICreatePrayerPayload) =>
    (await api.post<Prayer>("prayers", payload)).data;

  updatePrayer = async (prayerUnique: string, payload: IUpdatePrayerPayload) =>
    (await api.patch<Prayer>(`prayers/${prayerUnique}`, payload)).data;

  deletePrayer = async (prayerUnique: string) =>
    (await api.delete<Prayer>(`prayers/${prayerUnique}`)).data;
}

export const prayersProviders = new PrayersProviders();
