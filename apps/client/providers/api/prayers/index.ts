import cachedRequests from "@/config/cachedRequests";
import { CacheConfig, api } from "@/providers/api";
import revalidateCacheByTag from "@/utils/revalidateCacheByTag";
import {
  CreatePrayerDTO,
  ListPrayersQueryDTO,
  Prayer,
  ResponseList,
  UpdatePrayerDTO,
} from "project-common";

interface InvalidateCacheProps {
  categoryId?: string;
  prayerId?: string;
}

class PrayersProviders {
  listPrayers = async (params?: ListPrayersQueryDTO, options?: CacheConfig) =>
    (await api.get<ResponseList<Prayer>>("prayers", { params, ...options }))
      .data;

  getPrayer = async (prayerId: string, options?: CacheConfig) =>
    (await api.get<Prayer>(`prayers/${prayerId}`, options)).data;

  createPrayer = async (payload: CreatePrayerDTO, options?: CacheConfig) => {
    const { data } = await api.post<Prayer>("prayers", payload, options);
    this.invalidateCache({ categoryId: data.categoryId });
    return data;
  };

  updatePrayer = async (
    prayerId: string,
    payload: UpdatePrayerDTO,
    options?: CacheConfig
  ) => {
    const { data } = await api.patch<Prayer>(
      `prayers/${prayerId}`,
      payload,
      options
    );
    this.invalidateCache({ prayerId, categoryId: data.categoryId });
    return data;
  };

  deletePrayer = async (prayerId: string, options?: CacheConfig) => {
    const { data } = await api.delete<Prayer>(`prayers/${prayerId}`, options);
    this.invalidateCache({ prayerId, categoryId: data.categoryId });
    return data;
  };

  private invalidateCache = ({
    prayerId,
    categoryId,
  }: InvalidateCacheProps) => {
    if (prayerId) revalidateCacheByTag(prayerId);
    if (categoryId) revalidateCacheByTag(categoryId);
    cachedRequests.prayers.list.tags.forEach((it) => revalidateCacheByTag(it));
  };
}

export const prayersProviders = new PrayersProviders();
