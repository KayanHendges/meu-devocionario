import HtmlParser from "@components/HtmlParser";
import { Heading } from "@components/Texts/Heading";
import { Text } from "@components/Texts/Text";
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
    <div className="flex flex-col">
      <Heading size="lg">{title}</Heading>
      <Text>{description}</Text>
      <HtmlParser>{body}</HtmlParser>
    </div>
  );
}
