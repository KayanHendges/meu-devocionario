import { categoriesProviders } from "@providers/api/categories";
import { cache } from "react";

export const revalidate = 60 * 60 * 2;

export const listCategories = cache(async () =>
  categoriesProviders.listCategories()
);
