import Button from "@components/Buttons/Button";
import PageContainer from "@components/Container/Page";
import ClaimContainer from "@components/Container/Claim";
import PrayersList from "@components/Lists/PrayersList";
import { listPrayers } from "@utils/cachedRequests/prayers/listPrayers";
import Link from "next/link";

export default async function Home() {
  const { list: prayers } = await listPrayers({
    page: 1,
    pageSize: 10,
  });

  return (
    <PageContainer backButton={false} header="Orações" className="gap-4">
      <ClaimContainer requiredClaims={["prayer.create"]}>
        <Link href={"criar-oracao"}>
          <Button className="w-full" primary type="button">
            Criar Oração
          </Button>
        </Link>
      </ClaimContainer>
      <PrayersList list={prayers} />
      <Link href={"/categorias"}>
        <Button className="w-full" primary>
          Categorias
        </Button>
      </Link>
    </PageContainer>
  );
}
