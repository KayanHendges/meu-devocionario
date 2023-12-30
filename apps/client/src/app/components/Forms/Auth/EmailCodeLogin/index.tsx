"use client";

import Button from "@components/Buttons/Button";
import FormContainer from "@components/Forms/FormContainer";
import TextInput from "@components/Inputs/Text";
import { Heading } from "@components/Texts/Heading";
import { Text } from "@components/Texts/Text";
import { joiResolver } from "@hookform/resolvers/joi";
import { authProvider } from "@providers/api/auth";
import { handleSubmit } from "@utils/forms";
import Joi from "joi";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ComponentProps, FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props extends ComponentProps<"form"> {}

type ResetSteps = "sendCode" | "loginCode" | "success";

interface EmailCodeFormSchema {
  email: string;
  code: string;
}

export const emailFormSchema = Joi.object<EmailCodeFormSchema>({
  email: Joi.string().email({ tlds: { allow: false } }),
  code: Joi.string().length(6),
});

export default function EmailCodeLoginForm({ className, ...props }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resetStep, setResetStep] = useState<ResetSteps>("sendCode");
  const router = useRouter();

  const queryEmail = useSearchParams().get("email");

  const form = useForm<EmailCodeFormSchema>({
    resolver: joiResolver(emailFormSchema),
    defaultValues: {
      email: queryEmail || "",
    },
  });

  const email = form.watch("email");

  const sendCode = async () => {
    await form.trigger("email");

    await authProvider.requestCode({ email });

    setResetStep("loginCode");
  };

  const loginCode = async () => {
    const payload = await handleSubmit(form);

    await authProvider.loginCode(payload);

    setResetStep("success");
  };

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    try {
      if (resetStep === "sendCode") await sendCode();
      if (resetStep === "loginCode") await loginCode();
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (resetStep === "success")
      setTimeout(() => router.push("/preferencias"), 5 * 1000);
  }, [resetStep, router]);

  return (
    <FormContainer onSubmit={handleForm}>
      {resetStep === "sendCode" && (
        <>
          <Text size="xl">Confirme seu email</Text>
          <TextInput {...form.register("email")} />
          <Button isLoading={isLoading} primary>
            Confirmar
          </Button>
        </>
      )}
      {resetStep === "loginCode" && (
        <>
          <Text size="xl">Confirme o Código</Text>
          <TextInput type="number" {...form.register("code")} />
          <Text className="text-center" truncate={false}>
            {`Um código de 6 dígitos foi enviado para o email ${email}`}
            <br />
            Quando receber, confirme o código.
          </Text>
          <Button isLoading={isLoading} primary>
            Confirmar
          </Button>
        </>
      )}
      {resetStep === "success" && (
        <div className="text-center">
          <Heading>Validado Com Sucesso!</Heading>
          <Text truncate={false}>
            Você será redirecionado para alterar a sua senha em alguns segundos.
            <br />
            Se isso não acontecer,{" "}
            <Link href={"/preferencias"} className="text-primary underline">
              clique aqui para redirecionar
            </Link>
            .
          </Text>
        </div>
      )}
    </FormContainer>
  );
}
