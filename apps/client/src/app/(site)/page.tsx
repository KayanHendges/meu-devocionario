import Button from "@components/Buttons/Button";
import PageContainer from "@components/Container/Page";
import ClaimContainer from "@components/Container/Claim";
import PrayersList from "@components/Lists/PrayersList";
import Link from "next/link";
import { prayersProviders } from "@providers/api/prayers";
import cachedRequests from "@config/cachedRequests";

export default async function Home() {
  const { list: prayers } = await prayersProviders.listPrayers({
    page: 1,
    pageSize: 10,
  }, { next: cachedRequests.prayers.list });

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
