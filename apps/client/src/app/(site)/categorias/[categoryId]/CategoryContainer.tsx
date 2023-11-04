import Button from "@components/Buttons/Button";
import PageContainer from "@components/Container/Page";
import RoleContainer from "@components/Container/Role";
import LineDivider from "@components/Dividers/Line";
import HtmlDisplay from "@components/Html/HtmlDisplay";
import PrayersList from "@components/Lists/PrayersList";
import { Heading } from "@components/Texts/Heading";
import { categoriesProviders } from "@providers/api/categories";
import Link from "next/link";
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
      <RoleContainer roles={["admin", "moderator"]}>
        <div className="flex flex-col gap-2">
          <Link href={`${categoryId}/editar`}>
            <Button className="w-full">Editar</Button>
          </Link>
          <Button>Excluir</Button>
        </div>
      </RoleContainer>
    </PageContainer>
  );
}
