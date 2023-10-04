import { Category } from "database";

interface CreateCategoryPayload
  extends Omit<
    Category,
    "id" | "updatedAt" | "createdAt" | "cleanDescription"
  > {}

interface UpdateCategoryPayload extends Partial<CreateCategoryPayload> {}
