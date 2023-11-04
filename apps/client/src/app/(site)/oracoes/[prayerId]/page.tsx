import PrayerContainer from "@sites/oracoes/[prayerId]/PrayerContainer";
import { getPrayer } from "@utils/cachedRequests/prayers/getPrayer";
import { Metadata } from "next";

interface Props {
  params: { prayerId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { title, cleanDescription } = await getPrayer(params.prayerId);

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
