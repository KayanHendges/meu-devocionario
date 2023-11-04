import Button from "@components/Buttons/Button";
import PageContainer from "@components/Container/Page";
import RoleContainer from "@components/Container/Role";
import PrayersList from "@components/Lists/PrayersList";
import Link from "next/link";

export default async function Home() {
  return (
    <PageContainer backButton={false} header="Orações" className="gap-4">
      <RoleContainer roles={["admin", "moderator"]}>
        <Link href={"criar-oracao"}>
          <Button className="w-full" primary type="button">
            Criar Oração
          </Button>
        </Link>
      </RoleContainer>
      <PrayersList />
      <Link href={"/categorias"}>
        <Button className="w-full" primary>
          Categorias
        </Button>
      </Link>
    </PageContainer>
  );
}
