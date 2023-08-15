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
    <div className="flex flex-col p-2 gap-4">
      <Heading className="text-center w-full">Orações</Heading>
      <div className="flex flex-col gap-4">
        {list.map(({ id, title, cleanBody }) => (
          <Link key={id} href={`/oracoes/${title}`}>
            <Card>
              <Heading>{title}</Heading>
              {cleanBody && <Text>{cleanBody}</Text>}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
