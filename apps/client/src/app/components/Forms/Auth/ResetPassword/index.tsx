"use client";

import { authProvider } from "@providers/api/auth";
import { ComponentProps, FormEvent, useState } from "react";

interface Props extends ComponentProps<"form"> {}

type ResetSteps = "sendCode" | "validateCode" | "createPassWord" | "success";

export default function ResetPasswordForm({ className, ...props }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resetStep, setResetStep] = useState<ResetSteps>("sendCode");

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    try {
      if (resetStep === "sendCode") await authProvider.requestCode();
      if (resetStep === "validateCode") await authProvider.requestCode();
      if (resetStep === "createPassWord") await authProvider.requestCode();
      if (resetStep === "success") await authProvider.requestCode();
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return <form onSubmit={handleForm}></form>;
}
