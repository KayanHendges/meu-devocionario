import { api } from "@providers/api";
import {
  CreatePrayerDTO,
  ListPrayersQueryDTO,
  Prayer,
  ResponseList,
  UpdatePrayerDTO,
} from "project-common";

class PrayersProviders {
  listPrayers = async (params?: ListPrayersQueryDTO) =>
    (await api.get<ResponseList<Prayer>>("prayers", { params })).data;

  getPrayer = async (prayerUnique: string) =>
    (await api.get<Prayer>(`prayers/${prayerUnique}`)).data;

  createPrayer = async (payload: CreatePrayerDTO) =>
    (await api.post<Prayer>("prayers", payload)).data;

  updatePrayer = async (prayerUnique: string, payload: UpdatePrayerDTO) =>
    (await api.patch<Prayer>(`prayers/${prayerUnique}`, payload)).data;

  deletePrayer = async (prayerUnique: string) =>
    (await api.delete<Prayer>(`prayers/${prayerUnique}`)).data;
}

export const prayersProviders = new PrayersProviders();
