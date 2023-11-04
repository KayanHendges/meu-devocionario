"use client";

import PageContainer from "@components/Container/Page";
import LoginForm from "@components/forms/Auth/Login";
import RegisterForm from "@components/forms/Auth/Register";

export default function LoginPage() {
  return (
    <PageContainer header="Criar uma conta">
      <RegisterForm />
    </PageContainer>
  );
}
