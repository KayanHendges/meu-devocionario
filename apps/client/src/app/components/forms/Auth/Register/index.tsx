"use client";
import Joi from "joi";
import { useRouter } from "next/navigation";
import { ComponentProps, FormEvent, useContext, useState } from "react";
import {
  CreateCategoryDTO,
  LoginUserDTO,
  RegisterUserDTO,
} from "project-common";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import FormContainer from "@components/forms/FormContainer";
import TextInput from "@components/Inputs/Text";
import Button from "@components/Buttons/Button";
import { AuthContext } from "@contexts/Auth/AuthContext";
import { handleSubmit } from "@utils/forms";
import Link from "next/link";
import { authProvider } from "@providers/api/auth";

export const registerFormSchema = Joi.object<RegisterUserDTO>({
  name: Joi.string().min(2).max(200),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(8).max(200),
});

interface Props extends ComponentProps<"form"> {
  redirectPath?: string;
}

export default function RegisterForm({ redirectPath, ...props }: Props) {
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const { signIn } = useContext(AuthContext);
  const router = useRouter();

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
      router.push(redirectPath || "/meu-devocionario");
    } catch (error) {
      console.error(error);
    }

    setIsSubmiting(false);
  };

  return (
    <FormContainer onSubmit={handleRegister} className="gap-8" {...props}>
      <div className="flex flex-col gap-4">
        <TextInput label="Nome" {...form.register("name")} />
        <TextInput label="Email" type="email" {...form.register("email")} />
        <TextInput
          label="Senha"
          type="password"
          {...form.register("password")}
        />
      </div>
      <div className="flex flex-col gap-4">
        <Button isLoading={isSubmiting} primary>
          Criar
        </Button>
      </div>
    </FormContainer>
  );
}
