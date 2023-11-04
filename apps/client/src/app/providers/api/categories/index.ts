import { api } from "@providers/api";
import {
  CreateCategoryDTO,
  ResponseList,
  UpdateCategoryDTO,
  Category,
} from "project-common";

class CategoriesProviders {
  listCategories = async () =>
    (await api.get<ResponseList<Category>>("categories")).data;

  getCategory = async (prayerUnique: string) =>
    (await api.get<Category>(`categories/${prayerUnique}`)).data;

  createCategory = async (payload: CreateCategoryDTO) =>
    (await api.post<Category>("categories", payload)).data;

  updateCategory = async (prayerUnique: string, payload: UpdateCategoryDTO) =>
    (await api.patch<Category>(`categories/${prayerUnique}`, payload)).data;

  deleteCategory = async (prayerUnique: string) =>
    (await api.delete<Category>(`categories/${prayerUnique}`)).data;
}

export const categoriesProviders = new CategoriesProviders();
