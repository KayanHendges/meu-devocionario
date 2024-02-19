import CreateOrUpdatePrayerForm from "@/components/Forms/CreateOrUpdatePrayer";
import { prayersProviders } from "@/providers/api/prayers";

interface Props {
  params: { prayerId: string };
}

export default async function EditPrayerPage({ params }: Props) {
  const prayer = await prayersProviders.getPrayer(
    decodeURIComponent(params.prayerId),
    { cache: "no-cache" }
  );

  return (
    <>
      <title>{prayer.title}</title>
      <CreateOrUpdatePrayerForm prayer={prayer} />
    </>
  );
}
