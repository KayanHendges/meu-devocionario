import PageContainer from "@/components/Container/Page";
import EmailCodeLoginForm from "@/components/Forms/Auth/EmailCodeLogin";

export default function ResetPassword() {
  return (
    <div className="flex justify-center">
      <PageContainer className="max-w-[720px]" header="Redefinir Senha">
        <EmailCodeLoginForm />
      </PageContainer>
    </div>
  );
}
