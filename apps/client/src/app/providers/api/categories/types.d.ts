import { Category } from "project-types";

interface CreateCategoryPayload
  extends Omit<Category, "id" | "updatedAt" | "createdAt"> {}

interface UpdateCategoryPayload extends Partial<CreateCategoryPayload> {}
