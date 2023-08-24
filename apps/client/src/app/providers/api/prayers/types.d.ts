import { Prayer } from "project-common";

interface IListPrayersParams {
  categoryId?: string;
}

interface ICreatePrayerPayload
  extends Omit<
    Prayer,
    "id" | "cleanBody" | "cleanDescription" | "updatedAt" | "createdAt"
  > {}

interface IUpdatePrayerPayload extends Partial<ICreatePrayerPayload> {}
