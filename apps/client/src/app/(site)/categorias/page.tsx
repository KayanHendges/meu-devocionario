import Button from "@components/Buttons/Button";
import Card from "@components/Card";
import PageContainer from "@components/Container/Page";
import RoleContainer from "@components/Container/Role";
import { Heading } from "@components/Texts/Heading";
import { Text } from "@components/Texts/Text";
import { categoriesProviders } from "@providers/api/categories";
import { listCategories } from "@utils/cachedRequests/categories/listCategories";
import Link from "next/link";
import { cache } from "react";

export const revalidate = 60 * 60 * 3;

export default async function Page() {
  const { list } = await listCategories();

  return (
    <PageContainer header="Categorias">
      <div className="flex flex-col gap-4">
        <RoleContainer roles={["admin", "moderator"]}>
          <Link href={"criar-categoria"}>
            <Button className="w-full" primary type="button">
              Criar Categoria
            </Button>
          </Link>
        </RoleContainer>
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
