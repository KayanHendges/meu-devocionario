"use client";

import PageContainer from "@components/Container/Page";
import LoginForm from "@components/Forms/Auth/Login";

export default function LoginPage() {
  return (
    <PageContainer header="Entre com sua conta">
      <LoginForm />
    </PageContainer>
  );
}
