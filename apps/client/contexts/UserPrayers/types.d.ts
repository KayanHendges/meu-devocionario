import { Prayer, User } from "project-common";

interface IUserPrayersContext {
  prayers: Prayer[];
  includePrayer: (prayer: Prayer) => Promise<Prayer>;
  removePrayer: (prayer: Prayer) => Promise<Prayer>;
  isFetchingPrayers: boolean;
}
