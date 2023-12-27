import Button from "@components/Buttons/Button";
import PageContainer from "@components/Container/Page";
import ClaimContainer from "@components/Container/Claim";
import LineDivider from "@components/Dividers/Line";
import HtmlDisplay from "@components/Html/HtmlDisplay";
import PrayersList from "@components/Lists/PrayersList";
import { Heading } from "@components/Texts/Heading";
import Link from "next/link";
import { categoriesProviders } from "@providers/api/categories";
import cachedRequests from "@config/cachedRequests";
import { prayersProviders } from "@providers/api/prayers";
import DeleteCategoryButton from "@sites/categorias/[categoryId]/DeleteCategoryButton";

interface Props {
  categoryId: string;
}

export default async function CategoryContainer({ categoryId }: Props) {
  const { name, description } = await categoriesProviders.getCategory(
    categoryId,
    { next: { ...cachedRequests.categories.get, tags: [categoryId] } }
  );

  const { list: prayers } = await prayersProviders.listPrayers(
    {
      page: 1,
      pageSize: 100,
      categoryId,
    },
    { next: { ...cachedRequests.prayers.list, tags: [categoryId] } }
  );

  return (
    <PageContainer header={name} backButton="/categorias">
      <div className="flex flex-col w-full gap-4">
        {description && <HtmlDisplay>{description}</HtmlDisplay>}
      </div>
      <LineDivider />
      <Heading>Orações</Heading>
      <PrayersList list={prayers} />
      <div className="flex flex-col gap-2">
        <ClaimContainer requiredClaims={["category.update"]}>
          <Link href={`${categoryId}/editar`}>
            <Button className="w-full">Editar</Button>
          </Link>
        </ClaimContainer>
        <DeleteCategoryButton categoryId={categoryId}>
          Excluir
        </DeleteCategoryButton>
      </div>
    </PageContainer>
  );
}
