import { Prayer } from "api";

interface Props {
  prayer: Prayer;
}

export default function PrayerCard({ prayer }: Props) {
  return <div>{prayer.title}</div>;
}
