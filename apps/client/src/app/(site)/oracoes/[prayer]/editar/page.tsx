import PageContainer from "@components/Container/Page";
import { Heading } from "@components/Texts/Heading";
import CreateOrUpdatePrayerForm from "@components/forms/CreateOrUpdatePrayer";
import { prayersProviders } from "@providers/api/prayers";

interface Props {
  params: { prayer: string };
}

export default async function EditPrayerPage({ params }: Props) {
  const prayer = await prayersProviders.getPrayer(params.prayer);

  return (
    <PageContainer>
      <Heading>Editar Oração</Heading>
      <CreateOrUpdatePrayerForm prayer={prayer} />
    </PageContainer>
  );
}
