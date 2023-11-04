import { prayersProviders } from "@providers/api/prayers";
import { ListPrayersQueryDTO } from "project-common";
import { cache } from "react";

export const revalidate = 60 * 60 * 2;

export const listPrayers = cache(async (params?: ListPrayersQueryDTO) =>
  prayersProviders.listPrayers(params)
);
