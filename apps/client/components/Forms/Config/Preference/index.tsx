import ClaimContainer from "@/components/Container/Claim";
import { Heading } from "@/components/Texts/Heading";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import ChangePasswordForm from "../ChangePassword";
import { twMerge } from "tailwind-merge";
import { ComponentPropsWithoutRef } from "react";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/Texts/Text";

interface Props extends ComponentPropsWithoutRef<"div"> {}

export default function PreferenceForm({ className, ...props }: Props) {
  return (
    <div className={twMerge("flex flex-col gap-2", className)} {...props}>
      <Heading size="lg">Preferencias</Heading>
      <Separator />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Heading>Tema</Heading>
          <div className="flex gap-2 items-center">
            <Text>Escuro</Text>
            <ThemeSwitcher />
          </div>
        </div>
        <ClaimContainer>
          <ChangePasswordForm />
        </ClaimContainer>
      </div>
    </div>
  );
}
