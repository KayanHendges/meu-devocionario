import { prayersProviders } from "@providers/api/prayers";
import { cache } from "react";

export const revalidate = 60 * 60 * 3;

export const getPrayer = cache(async (prayerId: string) =>
  prayersProviders.getPrayer(prayerId)
);
