import ClaimContainer from "@/components/Container/Claim";
import PageContainer from "@/components/Container/Page";
import ChangePasswordForm from "@/components/Forms/Config/ChangePassword";
import { Heading } from "@/components/Texts/Heading";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default async function SettingsPage() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-2">
        <Heading>Tema</Heading>
        <ThemeSwitcher />
      </div>
      <ClaimContainer>
        <ChangePasswordForm />
      </ClaimContainer>
    </PageContainer>
  );
}
