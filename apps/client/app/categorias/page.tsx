import Button from "@/components/Buttons/Button";
import Card from "@/components/Card";
import PageContainer from "@/components/Container/Page";
import ClaimContainer from "@/components/Container/Claim";
import { Heading } from "@/components/Texts/Heading";
import { Text } from "@/components/Texts/Text";
import Link from "next/link";
import { categoriesProviders } from "@/providers/api/categories";
import cachedRequests from "@/config/cachedRequests";

export default async function Page() {
  const { list } = await categoriesProviders.listCategories({ next: cachedRequests.categories.list });

  return (
    <PageContainer header="Categorias">
      <div className="flex flex-col gap-4">
        <ClaimContainer requiredClaims={["category.create"]}>
          <Link href={"criar-categoria"}>
            <Button className="w-full" primary type="button">
              Criar Categoria
            </Button>
          </Link>
        </ClaimContainer>
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
