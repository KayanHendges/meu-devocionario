import PageContainer from "@components/Container/Page";
import EmailCodeLoginForm from "@components/Forms/Auth/EmailCodeLogin";

export default function ResetPassword() {
  return (
    <PageContainer header="Redefinir Senha">
      <EmailCodeLoginForm />
    </PageContainer>
  );
}
