import PageContainer from "@components/Container/Page";
import HtmlDisplay from "@components/Html/HtmlDisplay";
import { prayersProviders } from "@providers/api/prayers";
import { cache } from "react";
import PrayerDescriptionContainer from "src/app/(site)/oracoes/[prayerId]/PrayerDescriptionContainer";

interface Props {
  prayerId: string;
}

export const revalidate = 60 * 60 * 24;

export default async function PrayerContainer({ prayerId }: Props) {
  const getPrayer = cache(async () => prayersProviders.getPrayer(prayerId));

  const { title, description, body } = await getPrayer();

  return (
    <PageContainer header={title}>
      <div className="flex flex-col w-full gap-4">
        {description && (
          <PrayerDescriptionContainer>{description}</PrayerDescriptionContainer>
        )}
        <HtmlDisplay>{body}</HtmlDisplay>
      </div>
    </PageContainer>
  );
}
