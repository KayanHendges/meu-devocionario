import { prayersProviders } from "@providers/api/prayers";
import { cache } from "react";

export const revalidate = 60 * 60 * 2;

export const listPrayers = cache(async () => prayersProviders.listPrayers());
