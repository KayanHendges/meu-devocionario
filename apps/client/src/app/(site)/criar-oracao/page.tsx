import PageContainer from "@components/Container/Page";
import { Heading } from "@components/Texts/Heading";
import CreateOrUpdatePrayerForm from "@components/forms/CreateOrUpdatePrayer";

export default async function CreatePrayerPage() {
  return (
    <PageContainer header="Criar Oração">
      <CreateOrUpdatePrayerForm />
    </PageContainer>
  );
}
