import { api } from "@providers/api";
import { Prayer, ResponseList } from "shared-types";

class PrayersProviders {
  listPrayers = async () =>
    (await api.get<ResponseList<Prayer>>("prayers")).data;
}

export const prayersProviders = new PrayersProviders();
