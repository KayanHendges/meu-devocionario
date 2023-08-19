import PageContainer from "@components/Container/Page";
import LineDivider from "@components/Dividers/Line";
import HtmlDisplay from "@components/Html/HtmlDisplay";
import PrayersList from "@components/Lists/PrayersList";
import { Heading } from "@components/Texts/Heading";
import { categoriesProviders } from "@providers/api/categories";
import { prayersProviders } from "@providers/api/prayers";
import { cache } from "react";

interface Props {
  categoryId: string;
}

export const revalidate = 60 * 60 * 24;

export default async function CategoryContainer({ categoryId }: Props) {
  const getCategory = cache(async () =>
    categoriesProviders.getCategory(categoryId)
  );

  const { name, description } = await getCategory();

  return (
    <PageContainer header={name} backButton="/categorias">
      <div className="flex flex-col w-full gap-4">
        {description && <HtmlDisplay>{description}</HtmlDisplay>}
      </div>
      <LineDivider />
      <Heading>Orações</Heading>
      <PrayersList categoryId={categoryId} />
    </PageContainer>
  );
}
