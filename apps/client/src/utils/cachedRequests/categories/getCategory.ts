import { categoriesProviders } from "@providers/api/categories";
import { cache } from "react";

export const revalidate = 60 * 60 * 3;

export const getCategory = cache(async (categoryId: string) =>
  categoriesProviders.getCategory(categoryId)
);
