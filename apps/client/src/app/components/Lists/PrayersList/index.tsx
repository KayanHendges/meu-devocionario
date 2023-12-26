import HandleUserPrayerButton from "@components/Buttons/HandleUserPrayerButton";
import Card from "@components/Card";
import { Heading } from "@components/Texts/Heading";
import { Text } from "@components/Texts/Text";
import Link from "next/link";
import { Prayer } from "project-common";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
  list: Prayer[];
}

export default async function PrayersList({
  list,
  className,
  ...props
}: Props) {
  return (
    <div className={twMerge("flex flex-col gap-4", className)} {...props}>
      {list.map((prayer) => (
        <Link
          key={prayer.id}
          href={`/oracoes/${encodeURIComponent(prayer.id)}`}
        >
          <Card>
            <Heading>{prayer.title}</Heading>
            <div className="flex items-center justify-between gap-4">
              {prayer.cleanBody && <Text className="flex-1">{prayer.cleanBody}</Text>}
              <HandleUserPrayerButton prayer={prayer} />
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
