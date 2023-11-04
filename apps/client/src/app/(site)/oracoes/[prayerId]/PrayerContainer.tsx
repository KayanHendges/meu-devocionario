import Button from "@components/Buttons/Button";
import PageContainer from "@components/Container/Page";
import RoleContainer from "@components/Container/Role";
import HtmlDisplay from "@components/Html/HtmlDisplay";
import { prayersProviders } from "@providers/api/prayers";
import PrayerDescriptionContainer from "@sites/oracoes/[prayerId]/PrayerDescriptionContainer";
import { getPrayer } from "@utils/cachedRequests/prayers/getPrayer";
import Link from "next/link";
import { cache } from "react";

interface Props {
  prayerId: string;
}

export default async function PrayerContainer({ prayerId }: Props) {
  const { title, description, body } = await getPrayer(prayerId);

  return (
    <PageContainer header={title} backButton>
      <div className="flex flex-col w-full gap-4">
        {description && (
          <PrayerDescriptionContainer>{description}</PrayerDescriptionContainer>
        )}
        <HtmlDisplay>{body}</HtmlDisplay>
        <RoleContainer roles={["admin", "moderator"]}>
          <div className="flex flex-col gap-2">
            <Link href={`${prayerId}/editar`}>
              <Button className="w-full">Editar</Button>
            </Link>
            <Button>Excluir</Button>
          </div>
        </RoleContainer>
      </div>
    </PageContainer>
  );
}
