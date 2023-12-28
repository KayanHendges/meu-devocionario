"use client";

import PageContainer from "@components/Container/Page";
import LoginForm from "@components/Forms/Auth/Login";
import RegisterForm from "@components/Forms/Auth/Register";

export default function LoginPage() {
  return (
    <PageContainer header="Criar uma conta">
      <RegisterForm />
    </PageContainer>
  );
}
