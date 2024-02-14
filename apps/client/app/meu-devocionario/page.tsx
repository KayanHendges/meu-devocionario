import PageContainer from "@/components/Container/Page";
import UserPrayersList from "./UserPrayersList";

export default function MyDevotionalBookPage() {
  return (
    <PageContainer backButton={false}>
      <UserPrayersList />
    </PageContainer>
  );
}
