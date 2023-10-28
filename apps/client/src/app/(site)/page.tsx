import Button from "@components/Buttons/Button";
import CreateContentButton from "@components/Buttons/CreateContentButton";
import PageContainer from "@components/Container/Page";
import PrayersList from "@components/Lists/PrayersList";
import Link from "next/link";

export default async function Home() {
  return (
    <PageContainer backButton={false} header="Orações" className="gap-4">
      <Link href={"criar-oracao"}>
        <CreateContentButton className="w-full" primary type="button">
          Criar Oração
        </CreateContentButton>
      </Link>
      <PrayersList />
      <Link href={"/categorias"}>
        <Button className="w-full" primary>
          Categorias
        </Button>
      </Link>
    </PageContainer>
  );
}
