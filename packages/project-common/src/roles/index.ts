import * as _ from "lodash";
import { UserRole } from "database";
import { ClaimKeys, ClaimRole } from "./claims";
export * from "./claims";

export const roles: ClaimRole = {
  admin: {
    users: { all: true },
    prayer: { all: true },
    category: { all: true },
  },
  moderator: {
    prayer: { all: true },
    category: { all: true },
  },
  user: {},
};

export const validateRoleClaim = (
  userRole: UserRole,
  requiredClaims: ClaimKeys[]
): boolean => {
  const roleClaim = roles[userRole];

  if (!roleClaim) return false;

  return requiredClaims.every((role) => {
    const claimAll = role.replace(/\w*$/, "all");
    return _.get(roleClaim, role) || _.get(roleClaim, claimAll);
  });
};
