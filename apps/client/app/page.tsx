import { Button } from "@/components/ui/button";
import PageContainer from "@/components/Container/Page";
import ClaimContainer from "@/components/Container/Claim";
import Link from "next/link";
import { prayersProviders } from "@/providers/api/prayers";
import cachedRequests from "@/config/cachedRequests";
import { Heading } from "@/components/Texts/Heading";
import { Separator } from "@/components/ui/separator";
import PrayersList from "@/components/Lists/PrayersList";
import { categoriesProviders } from "@/providers/api/categories";
import CategoryList from "@/components/Lists/CategoryList";

export default async function Home() {
  const { list: prayers } = await prayersProviders.listPrayers(
    {
      page: 1,
      pageSize: 10,
    },
    { next: cachedRequests.prayers.list }
  );

  const { list: categories } = await categoriesProviders.listCategories({
    next: cachedRequests.categories.list,
  });

  return (
    <PageContainer backButton={false} className="gap-4">
      <Heading size="lg">Meu Devocionario</Heading>
      <Separator />
      <div className="flex items-center justify-between">
        <Heading>Categorias</Heading>
        <ClaimContainer requiredClaims={["category.create"]}>
          <Link href={"criar-oracao"}>
            <Button type="button">Criar Categoria</Button>
          </Link>
        </ClaimContainer>
      </div>
      <CategoryList list={categories} />
      <Separator />
      <div className="flex items-center justify-between">
        <Heading>Orações</Heading>
        <ClaimContainer requiredClaims={["prayer.create"]}>
          <Link href={"criar-oracao"}>
            <Button type="button">Criar Oração</Button>
          </Link>
        </ClaimContainer>
      </div>
      <PrayersList list={prayers} />
    </PageContainer>
  );
}
