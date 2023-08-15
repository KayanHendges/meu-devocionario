import { Prayer } from "project-types";

interface CreatePrayerPayload
  extends Omit<Prayer, "id" | "cleanBody" | 'cleanDescription' | "updatedAt" | "createdAt"> {}

interface UpdatePrayerPayload extends Partial<CreatePrayerPayload> {}
