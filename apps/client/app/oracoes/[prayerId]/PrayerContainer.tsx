import { Button } from "@/components/ui/button";
import PageContainer from "@/components/Container/Page";
import ClaimContainer from "@/components/Container/Claim";
import HtmlDisplay from "@/components/Html/HtmlDisplay";
import { prayersProviders } from "@/providers/api/prayers";
import PrayerDescriptionContainer from "./PrayerDescriptionContainer";
import Link from "next/link";
import HandleUserPrayerButton from "@/components/Buttons/HandleUserPrayerButton";
import cachedRequests from "@/config/cachedRequests";
import DeletePrayerButton from "./DeletePrayerButton";

interface Props {
  prayerId: string;
}

export default async function PrayerContainer({ prayerId }: Props) {
  const prayer = await prayersProviders.getPrayer(prayerId, {
    next: { ...cachedRequests.prayers.get, tags: [prayerId] },
  });
  const { title, description, body } = prayer;

  return (
    <PageContainer header={title} backButton>
      <div className="flex flex-col w-full gap-4">
        {description && (
          <PrayerDescriptionContainer>{description}</PrayerDescriptionContainer>
        )}
        <HtmlDisplay>{body}</HtmlDisplay>
        <div className="flex flex-col gap-2">
          <ClaimContainer requiredClaims={["prayer.update"]}>
            <Link href={`${prayerId}/editar`}>
              <Button className="w-full">Editar</Button>
            </Link>
          </ClaimContainer>
          <ClaimContainer requiredClaims={["prayer.delete"]}>
            <DeletePrayerButton prayerId={prayerId}>Excluir</DeletePrayerButton>
          </ClaimContainer>
          <HandleUserPrayerButton prayer={prayer} />
        </div>
      </div>
    </PageContainer>
  );
}
