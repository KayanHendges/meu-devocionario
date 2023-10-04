import { Prayer } from "database";

interface IListPrayersParams {
  categoryId?: string;
}

interface ICreatePrayerPayload
  extends Omit<
    Prayer,
    "id" | "cleanBody" | "cleanDescription" | "updatedAt" | "createdAt"
  > {}

interface IUpdatePrayerPayload extends Partial<ICreatePrayerPayload> {}
