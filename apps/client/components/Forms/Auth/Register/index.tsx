"use client";
import Joi from "joi";
import { ComponentProps, FormEvent, useContext, useState } from "react";
import { RegisterUserDTO } from "project-common";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import FormContainer from "@/components/Forms/FormContainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/Auth/AuthContext";
import { handleSubmit } from "@/utils/forms";
import { authProvider } from "@/providers/api/auth";
import {
  emailFormField,
  nameFormField,
  passwordFormField,
} from "@/config/joiForms";

export const registerFormSchema = Joi.object<RegisterUserDTO>({
  name: nameFormField,
  email: emailFormField,
  password: passwordFormField,
});

interface Props extends ComponentProps<"form"> {
  onFinish?: () => void;
}

export default function RegisterForm({ onFinish, ...props }: Props) {
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const { signIn } = useContext(AuthContext);

  const form = useForm<RegisterUserDTO>({
    resolver: joiResolver(registerFormSchema),
  });

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmiting(true);

    try {
      const payload = await handleSubmit(form);
      const { email } = await authProvider.register(payload);
      await signIn({ email, password: payload.password });

      onFinish && onFinish();
    } catch (error) {
      console.error(error);
    }

    setIsSubmiting(false);
  };

  return (
    <FormContainer onSubmit={handleRegister} className="gap-8" {...props}>
      <div className="flex flex-col gap-4">
        <Input label="Nome" {...form.register("name")} />
        <Input label="Email" type="email" {...form.register("email")} />
        <Input label="Senha" type="password" {...form.register("password")} />
      </div>
      <div className="flex flex-col gap-4">
        <Button isLoading={isSubmiting} variant={"primary"}>
          Criar
        </Button>
      </div>
    </FormContainer>
  );
}
