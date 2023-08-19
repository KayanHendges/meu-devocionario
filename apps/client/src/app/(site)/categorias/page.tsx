import Card from "@components/Card";
import PageContainer from "@components/Container/Page";
import { Heading } from "@components/Texts/Heading";
import { Text } from "@components/Texts/Text";
import { categoriesProviders } from "@providers/api/categories";
import Link from "next/link";
import { cache } from "react";

export const revalidate = 60 * 60 * 3;

export default async function Page() {
  const getCategories = cache(async () => categoriesProviders.listCategories());

  const { list } = await getCategories();

  return (
    <PageContainer header="Categorias">
      <div className="flex flex-col gap-4">
        {list.map(({ id, name, cleanDescription }) => (
          <Link key={id} href={`categorias/${encodeURIComponent(id)}`}>
            <Card>
              <Heading>{name}</Heading>
              {cleanDescription && <Text>{cleanDescription}</Text>}
            </Card>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
