import Card from "@components/Card";
import { Heading } from "@components/Texts/Heading";
import { Text } from "@components/Texts/Text";
import { prayersProviders } from "@providers/api/prayers";
import Link from "next/link";
import { cache } from "react";

export const revalidate = 60 * 60 * 3;

export default async function Home() {
  const getPrayers = cache(async () => prayersProviders.listPrayers());

  const { list } = await getPrayers();

  return (
    <div className="flex flex-col p-2">
      <Heading>Orações</Heading>
      <div className="space-y-2">
        {list.map(({ id, title, description }) => (
          <Link key={id} href={`/oracoes/${title}`}>
            <Card>
              <Heading>{title}</Heading>
              {description && <Text>{description}</Text>}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
