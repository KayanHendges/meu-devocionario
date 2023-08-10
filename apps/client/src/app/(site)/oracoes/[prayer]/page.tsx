import PrayerContainer from "src/app/(site)/oracoes/[prayer]/PrayerContainer";

interface Props {
  params: { prayer: string };
}

export default function Page({ params }: Props) {
  const { prayer } = params;
  return (
    <div className="flex flex-col">
      <PrayerContainer prayerTitle={decodeURI(prayer)} />
    </div>
  );
}
