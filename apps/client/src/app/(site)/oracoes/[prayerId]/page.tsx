import { prayersProviders } from "@providers/api/prayers";
import { Metadata, ResolvingMetadata } from "next";
import { cache } from "react";
import PrayerContainer from "src/app/(site)/oracoes/[prayerId]/PrayerContainer";

interface Props {
  params: { prayerId: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.prayerId;

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
  return (
    <div className="flex flex-col">
      <PrayerContainer prayerId={decodeURIComponent(prayerId)} />
    </div>
  );
}
