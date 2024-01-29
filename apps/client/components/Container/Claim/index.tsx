"use client";
import { UserContext } from "@/contexts/User/UserContext";
import { Claim, DeepestNestedKeys, validateRoleClaim } from "project-common";
import { ReactNode, useContext } from "react";

export type ClaimKeys = DeepestNestedKeys<Claim>;

interface Props {
  requiredClaims?: ClaimKeys[];
  children?: ReactNode;
}

export default function ClaimContainer({
  requiredClaims = [],
  children,
}: Props) {
  const { user } = useContext(UserContext);

  const canHandleContent =
    user?.role && validateRoleClaim(user.role, requiredClaims);

  if (!canHandleContent) return <></>;

  return children;
}
