import Button from "@components/Buttons/Button";
import PageContainer from "@components/Container/Page";
import PrayersList from "@components/Lists/PrayersList";
import Link from "next/link";

export default async function Home() {
  return (
    <PageContainer backButton={false} header="Orações" className="gap-4">
      <PrayersList />
      <Link href={"/categorias"}>
        <Button className="w-full" primary>
          Categorias
        </Button>
      </Link>
    </PageContainer>
  );
}
