import PageContainer from "@/components/Container/Page";
import SignInForm from "@/components/Forms/Auth/SignIn";

export default function LoginPage() {
  return (
    <div className="flex justify-center">
      <PageContainer className="max-w-[720px]" header="Entre com sua conta">
        <SignInForm defaultValue="login" />
      </PageContainer>
    </div>
  );
}
