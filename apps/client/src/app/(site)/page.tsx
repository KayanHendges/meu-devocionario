import Card from "@components/Card";
import PageContainer from "@components/Container/Page";
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
    <PageContainer backButton={false} header="Orações" className="gap-4">
      <div className="flex flex-col gap-4">
        {list.map(({ id, title, cleanBody }) => (
          <Link key={id} href={`/oracoes/${encodeURIComponent(id)}`}>
            <Card>
              <Heading>{title}</Heading>
              {cleanBody && <Text>{cleanBody}</Text>}
            </Card>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
