import PageContainer from "@components/Container/Page";
import { Heading } from "@components/Texts/Heading";
import CreateOrUpdatePrayerForm from "@components/forms/CreateOrUpdatePrayer";
import { prayersProviders } from "@providers/api/prayers";

interface Props {
  params: { prayerId: string };
}

export default async function EditPrayerPage({ params }: Props) {
  const prayer = await prayersProviders.getPrayer(
    decodeURIComponent(params.prayerId),
    { cache: "no-cache" }
  );

  return (
    <PageContainer
      header="Editar Oração"
      backButton={`../${encodeURIComponent(prayer.id)}`}
    >
      <title>{prayer.title}</title>
      <CreateOrUpdatePrayerForm prayer={prayer} />
    </PageContainer>
  );
}
