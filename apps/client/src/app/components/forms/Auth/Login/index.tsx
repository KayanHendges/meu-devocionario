"use client";
import Joi from "joi";
import { useRouter } from "next/navigation";
import { ComponentProps, FormEvent, useContext, useState } from "react";
import { CreateCategoryDTO, LoginUserDTO } from "project-common";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import FormContainer from "@components/forms/FormContainer";
import TextInput from "@components/Inputs/Text";
import Button from "@components/Buttons/Button";
import { AuthContext } from "@contexts/Auth/AuthContext";
import { handleSubmit } from "@utils/forms";
import Link from "next/link";

export const loginFormSchema = Joi.object<LoginUserDTO>({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().optional(),
});

interface Props extends ComponentProps<"form"> {
  redirectPath?: string;
}

export default function LoginForm({ redirectPath, ...props }: Props) {
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const { signIn } = useContext(AuthContext);
  const router = useRouter();

  const form = useForm<LoginUserDTO>({
    resolver: joiResolver(loginFormSchema),
  });

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmiting(true);

    try {
      const payload = await handleSubmit(form);
      await signIn(payload);
      router.push(redirectPath || "/meu-devocionario");
    } catch (error) {
      console.error(error);
    }

    setIsSubmiting(false);
  };

  return (
    <FormContainer onSubmit={handleLogin} className="gap-8" {...props}>
      <div className="flex flex-col gap-4">
        <TextInput label="Email" type="email" {...form.register("email")} />
        <TextInput
          label="Senha"
          type="password"
          {...form.register("password")}
        />
      </div>
      <div className="flex flex-col gap-4">
        <Button isLoading={isSubmiting} primary>
          Entrar
        </Button>
        <Link href={"/registrar"}>
          <Button className="w-full" disabled={isSubmiting}>
            Crie uma conta
          </Button>
        </Link>
      </div>
    </FormContainer>
  );
}
