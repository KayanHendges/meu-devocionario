import cachedRequests from "@config/cachedRequests";
import { prayersProviders } from "@providers/api/prayers";
import PrayerContainer from "@sites/oracoes/[prayerId]/PrayerContainer";
import { Metadata } from "next";

interface Props {
  params: { prayerId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { title, cleanDescription } = await prayersProviders.getPrayer(
    params.prayerId,
    { next: cachedRequests.prayers.get }
  );

  return {
    title: title,
    description: cleanDescription,
    openGraph: {
      type: "article",
      title,
      description: cleanDescription || undefined,
      // url: `meudevocionario.com.br`,
    },
  };
}

export default function Page({ params }: Props) {
  const { prayerId } = params;
  return <PrayerContainer prayerId={decodeURIComponent(prayerId)} />;
}
