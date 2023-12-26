import { CacheConfig, api } from "@providers/api";
import {
  CreatePrayerDTO,
  ListPrayersQueryDTO,
  Prayer,
  ResponseList,
  UpdatePrayerDTO,
} from "project-common";

class PrayersProviders {
  listPrayers = async (params?: ListPrayersQueryDTO, options?: CacheConfig) =>
    (await api.get<ResponseList<Prayer>>("prayers", { params, ...options }))
      .data;

  getPrayer = async (prayerUnique: string, options?: CacheConfig) =>
    (await api.get<Prayer>(`prayers/${prayerUnique}`, options)).data;

  createPrayer = async (payload: CreatePrayerDTO, options?: CacheConfig) =>
    (await api.post<Prayer>("prayers", payload, options)).data;

  updatePrayer = async (prayerUnique: string, payload: UpdatePrayerDTO, options?: CacheConfig) =>
    (await api.patch<Prayer>(`prayers/${prayerUnique}`, payload, options)).data;

  deletePrayer = async (prayerUnique: string, options?: CacheConfig) =>
    (await api.delete<Prayer>(`prayers/${prayerUnique}`, options)).data;
}

export const prayersProviders = new PrayersProviders();
