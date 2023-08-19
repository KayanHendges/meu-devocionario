import { Category } from "project-types";

interface CreateCategoryPayload
  extends Omit<
    Category,
    "id" | "updatedAt" | "createdAt" | "cleanDescription"
  > {}

interface UpdateCategoryPayload extends Partial<CreateCategoryPayload> {}
