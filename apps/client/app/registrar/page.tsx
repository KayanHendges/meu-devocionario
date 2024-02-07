"use client";

import PageContainer from "@/components/Container/Page";
import LoginForm from "@/components/Forms/Auth/Login";
import RegisterForm from "@/components/Forms/Auth/Register";

export default function LoginPage() {
  return (
    <div className="flex justify-center">
      <PageContainer className="max-w-[720px]" header="Criar uma conta">
        <RegisterForm />
      </PageContainer>
    </div>
  );
}
