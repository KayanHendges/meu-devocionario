"use client";

import PageContainer from "@/components/Container/Page";
import LoginForm from "@/components/Forms/Auth/Login";

export default function LoginPage() {
  return (
    <div className="flex justify-center">
      <PageContainer className="max-w-[720px]" header="Entre com sua conta">
        <LoginForm />
      </PageContainer>
    </div>
  );
}
