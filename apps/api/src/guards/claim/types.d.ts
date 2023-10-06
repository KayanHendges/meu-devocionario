import { UserRole } from 'database';

interface Claim {
  user: {
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
type ClaimKeys = DeepestNestedKeys<Claim>;

type ClaimRole = Record<UserRole, DeepPartial<Claim>>;
