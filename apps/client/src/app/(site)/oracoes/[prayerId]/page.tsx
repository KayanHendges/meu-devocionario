import { prayersProviders } from "@providers/api/prayers";
import PrayerContainer from "@sites/oracoes/[prayerId]/PrayerContainer";
import { Metadata } from "next";
import { cache } from "react";

interface Props {
  params: { prayerId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const getPrayer = cache(async () =>
    prayersProviders.getPrayer(decodeURIComponent(params.prayerId))
  );

  const { title, cleanDescription } = await getPrayer();

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
