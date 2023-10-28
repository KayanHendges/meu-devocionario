"use client";
import Button, { ButtonProps } from "@components/Buttons/Button";
import { UserContext } from "@contexts/User/UserContext";
import { UserRole } from "database";
import { useContext } from "react";

interface Props extends ButtonProps {}

export default function CreateContentButton(props: Props) {
  const { user } = useContext(UserContext);

  const handleContentRoles: UserRole[] = ["admin", "moderator"];
  const canHandleContent = user?.role && handleContentRoles.includes(user.role);

  if (!canHandleContent) return <></>;

  return <Button {...props} />;
}
