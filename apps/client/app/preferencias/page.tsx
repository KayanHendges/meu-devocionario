import PageContainer from "@/components/Container/Page";
import PreferenceForm from "@/components/Forms/Config/Preference";

export default async function SettingsPage() {
  return (
    <PageContainer>
      <PreferenceForm />
    </PageContainer>
  );
}
