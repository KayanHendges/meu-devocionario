import revalidateCacheByTag from "@/utils/revalidateCacheByTag";
import cachedRequests from "@/config/cachedRequests";
import { CacheConfig, api } from "@/providers/api";
import {
  CreateCategoryDTO,
  ResponseList,
  UpdateCategoryDTO,
  Category,
} from "project-common";

class CategoriesProviders {
  listCategories = async (options?: CacheConfig) =>
    (await api.get<ResponseList<Category>>("categories", options)).data;

  getCategory = async (prayerUnique: string, options?: CacheConfig) =>
    (await api.get<Category>(`categories/${prayerUnique}`, options)).data;

  createCategory = async (
    payload: CreateCategoryDTO,
    options?: CacheConfig
  ) => {
    const { data } = await api.post<Category>("categories", payload, options);
    this.invalidateCache();
    return data;
  };

  updateCategory = async (
    categoryId: string,
    payload: UpdateCategoryDTO,
    options?: CacheConfig
  ) => {
    const { data } = await api.patch<Category>(
      `categories/${categoryId}`,
      payload,
      options
    );
    this.invalidateCache(categoryId);
    return data;
  };

  deleteCategory = async (categoryId: string, options?: CacheConfig) => {
    const { data } = await api.delete<Category>(
      `categories/${categoryId}`,
      options
    );
    this.invalidateCache(categoryId);
    return data;
  };

  private invalidateCache = (categoryId?: string) => {
    if (categoryId) revalidateCacheByTag(categoryId);
    cachedRequests.categories.list.tags.forEach((it) => revalidateCacheByTag(it));
  };
}

export const categoriesProviders = new CategoriesProviders();
