import { Category } from "project-common";

interface CreateCategoryPayload
  extends Omit<
    Category,
    "id" | "updatedAt" | "createdAt" | "cleanDescription"
  > {}

interface UpdateCategoryPayload extends Partial<CreateCategoryPayload> {}
