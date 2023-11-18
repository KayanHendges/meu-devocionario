import { UserRole } from "database";
import { DeepPartial, DeepestNestedKeys } from "src/utils";

export interface Claim {
  users: {
    all: boolean;
    read: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  category: {
    all: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  prayer: {
    all: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}
export type ClaimKeys = DeepestNestedKeys<Claim>;

export type ClaimRole = Record<UserRole, DeepPartial<Claim>>;
