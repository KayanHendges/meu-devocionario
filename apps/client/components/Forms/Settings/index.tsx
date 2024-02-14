import ClaimContainer from "@/components/Container/Claim";
import { Heading } from "@/components/Texts/Heading";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import ChangePasswordForm from "../Config/ChangePassword";
import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentPropsWithoutRef<"div"> {}

export default function SettingsForm({ className, ...props }: Props) {
  return (
    <div className={twMerge("", className)} {...props}>
      <div className="flex flex-col gap-2">
        <Heading>Tema</Heading>
        <ThemeSwitcher />
      </div>
      <ClaimContainer>
        <ChangePasswordForm />
      </ClaimContainer>
    </div>
  );
}
