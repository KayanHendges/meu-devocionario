import Button from "@components/Buttons/Button";
import PageContainer from "@components/Container/Page";
import ClaimContainer from "@components/Container/Claim";
import LineDivider from "@components/Dividers/Line";
import HtmlDisplay from "@components/Html/HtmlDisplay";
import PrayersList from "@components/Lists/PrayersList";
import { Heading } from "@components/Texts/Heading";
import { getCategory } from "@utils/cachedRequests/categories/getCategory";
import { listPrayers } from "@utils/cachedRequests/prayers/listPrayers";
import Link from "next/link";

interface Props {
  categoryId: string;
}

export default async function CategoryContainer({ categoryId }: Props) {
  const { name, description } = await getCategory(categoryId);
  const { list: prayers } = await listPrayers({
    page: 1,
    pageSize: 100,
    categoryId,
  });

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
        <ClaimContainer requiredClaims={["category.delete"]}>
          <Button>Excluir</Button>
        </ClaimContainer>
      </div>
    </PageContainer>
  );
}
