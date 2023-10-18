import Card from "@components/Card";
import { Heading } from "@components/Texts/Heading";
import { Text } from "@components/Texts/Text";
import { prayersProviders } from "@providers/api/prayers";
import Link from "next/link";
import { ComponentProps, cache } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
  categoryId?: string;
}

export const revalidate = 60 * 60 * 3;

export default async function PrayersList({
  className,
  categoryId,
  ...props
}: Props) {
  const getPrayers = cache(async () =>
    prayersProviders.listPrayers({
      categoryId,
      page: 1,
      pageSize: 10,
      orderBy: { body: "asc" },
    })
  );

  const { list } = await getPrayers();

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
