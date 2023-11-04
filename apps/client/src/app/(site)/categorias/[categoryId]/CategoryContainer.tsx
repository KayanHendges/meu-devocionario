import Button from "@components/Buttons/Button";
import PageContainer from "@components/Container/Page";
import RoleContainer from "@components/Container/Role";
import LineDivider from "@components/Dividers/Line";
import HtmlDisplay from "@components/Html/HtmlDisplay";
import PrayersList from "@components/Lists/PrayersList";
import { Heading } from "@components/Texts/Heading";
import { getCategory } from "@utils/cachedRequests/categories/getCategory";
import Link from "next/link";

interface Props {
  categoryId: string;
}

export default async function CategoryContainer({ categoryId }: Props) {
  const { name, description } = await getCategory(categoryId);

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
