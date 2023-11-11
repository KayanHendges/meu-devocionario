import Card from "@components/Card";
import { Heading } from "@components/Texts/Heading";
import { Text } from "@components/Texts/Text";
import { listPrayers } from "@utils/cachedRequests/prayers/listPrayers";
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
      {list.map(({ id, title, cleanBody }) => (
        <Link key={id} href={`/oracoes/${encodeURIComponent(id)}`}>
          <Card>
            <Heading>{title}</Heading>
            {cleanBody && <Text>{cleanBody}</Text>}
          </Card>
        </Link>
      ))}
    </div>
  );
}
