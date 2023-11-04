"use client";
import { UserContext } from "@contexts/User/UserContext";
import { UserRole } from "database";
import { ComponentProps, Fragment, ReactNode, useContext } from "react";

interface Props {
  roles: UserRole[];
  children: ReactNode;
}

export default function RoleContainer({ roles, children }: Props) {
  const { user } = useContext(UserContext);

  const canHandleContent = user?.role && roles.includes(user.role);

  if (!canHandleContent) return <></>;

  return children;
}
