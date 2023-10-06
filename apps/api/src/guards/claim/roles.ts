import { ClaimRole } from '@guards/claim/types';

export const roles: ClaimRole = {
  admin: {
    user: { all: true },
    prayer: { all: true },
    category: { all: true },
  },
  moderator: {
    prayer: { all: true },
    category: { all: true },
  },
  user: {},
};
