import { Prayer, User } from "project-common";

interface IUserPrayersContext {
  prayers: Prayer[];
  includePrayer: (prayer: Prayer) => Promise<void>;
  removePrayer: (prayer: Prayer) => Promise<Prayer>;
  isFetchingPrayers: boolean;
}
