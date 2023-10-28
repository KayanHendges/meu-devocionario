"use client";

import PageContainer from "@components/Container/Page";
import LoginForm from "@components/forms/Auth/Login";

export default function LoginPage() {
  return (
    <PageContainer header="Entre com sua Conta">
      <LoginForm />
    </PageContainer>
  );
}
