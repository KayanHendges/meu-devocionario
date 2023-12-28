import PageContainer from "@components/Container/Page";
import ResetPasswordForm from "@components/Forms/Auth/ResetPassword";

export default function ResetPassword() {
  return (
    <PageContainer header="Redefinir Senha">
      <ResetPasswordForm />
    </PageContainer>
  );
}
