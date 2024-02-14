"use client";
import Joi from "joi";
import { ComponentProps, FormEvent, useContext, useState } from "react";
import { LoginUserDTO } from "project-common";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import FormContainer from "@/components/Forms/FormContainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/Auth/AuthContext";
import { handleSubmit } from "@/utils/forms";
import Link from "next/link";
import { Text } from "@/components/Texts/Text";

export const loginFormSchema = Joi.object<LoginUserDTO>({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().optional(),
});

interface Props extends ComponentProps<"form"> {
  onFinish?: () => void;
}

export default function LoginForm({ onFinish, ...props }: Props) {
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const { signIn } = useContext(AuthContext);

  const form = useForm<LoginUserDTO>({
    resolver: joiResolver(loginFormSchema),
  });

  const email = form.watch("email");
  const forgotPasswordLink = `/redefinir-senha${email && `?email=${email}`}`;

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmiting(true);

    try {
      const payload = await handleSubmit(form);
      await signIn(payload);

      onFinish && onFinish();
    } catch (error) {
      console.error(error);
    }

    setIsSubmiting(false);
  };

  return (
    <FormContainer onSubmit={handleLogin} className="gap-8" {...props}>
      <div className="flex flex-col gap-2">
        <Input label="Email" type="email" {...form.register("email")} />
        <Input label="Senha" type="password" {...form.register("password")} />
        <Text className="underline text-brand dark:text-brand" asChild>
          <Link href={forgotPasswordLink}>Esqueci minha senha</Link>
        </Text>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button className="w-full" isLoading={isSubmiting} variant={"primary"}>
          Entrar
        </Button>
      </div>
    </FormContainer>
  );
}
