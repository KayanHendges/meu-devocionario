"use client";
import Button from "@/components/Buttons/Button";
import FormContainer from "@/components/Forms/FormContainer";
import TextInput from "@/components/Inputs/Text";
import { Heading } from "@/components/Texts/Heading";
import { Text } from "@/components/Texts/Text";
import { passwordFormField } from "@/config/joiForms";
import { joiResolver } from "@hookform/resolvers/joi";
import { authProvider } from "@/providers/api/auth";
import { handleSubmit } from "@/utils/forms";
import Joi from "joi";
import { ComponentProps, FormEvent, useState } from "react";
import { useForm } from "react-hook-form";

interface Props extends ComponentProps<"form"> {}

interface ChangePasswordFormSchema {
  password: string;
  confirmPassword: string;
}

type Step = "disabled" | "setPassword" | "success";

export const changePasswordFormSchema = Joi.object<ChangePasswordFormSchema>({
  password: passwordFormField,
  confirmPassword: passwordFormField,
});

export default function ChangePasswordForm(props: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<Step>("disabled");

  const form = useForm<ChangePasswordFormSchema>({
    resolver: joiResolver(changePasswordFormSchema),
  });

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    try {
      const { password, confirmPassword } = await handleSubmit(form);

      if (password !== confirmPassword)
        form.setError("confirmPassword", { type: "value" });

      await authProvider.resetPassword({ password });

      setStep("success");
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <FormContainer onSubmit={handleForm} {...props}>
      {step === "disabled" && (
        <Button type="button" onClick={() => setStep("setPassword")}>
          Redefinir senha
        </Button>
      )}
      {step === "setPassword" && (
        <>
          <Heading>Redefinir Senha</Heading>
          <TextInput
            type="password"
            label="Nova senha"
            {...form.register("password")}
          />
          <TextInput
            type="password"
            label="Confirme a nova senha"
            {...form.register("confirmPassword")}
          />
          <Button primary>Redefinir</Button>
        </>
      )}
      {step === "success" && <Text>Sua senha foi redefinida com sucesso.</Text>}
    </FormContainer>
  );
}
