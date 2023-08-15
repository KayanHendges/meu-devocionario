import BackButton from "@components/Buttons/BackButton";
import PageContainer from "@components/Container/Page";
import HtmlDisplay from "@components/Html/HtmlDisplay";
import { Heading } from "@components/Texts/Heading";
import { prayersProviders } from "@providers/api/prayers";
import { cache } from "react";

interface Props {
  prayerTitle: string;
}

export const revalidate = 60 * 60 * 24;

export default async function PrayerContainer({ prayerTitle }: Props) {
  const getPrayer = cache(async () => prayersProviders.getPrayer(prayerTitle));

  const { title, description, body } = await getPrayer();

  return (
    <PageContainer header={title}>
      <div className="flex flex-col w-full gap-4">
        {description && <HtmlDisplay>{description}</HtmlDisplay>}
        <HtmlDisplay>{body}</HtmlDisplay>
      </div>
    </PageContainer>
  );
}
