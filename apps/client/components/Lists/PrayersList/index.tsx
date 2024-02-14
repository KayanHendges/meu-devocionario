import HandleUserPrayerButton from "@/components/Buttons/HandleUserPrayerButton";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/Texts/Heading";
import { Text } from "@/components/Texts/Text";
import Link from "next/link";
import { Prayer } from "project-common";
import { ComponentProps, Suspense } from "react";
import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/components/ui/skeleton";

interface Props extends ComponentProps<"div"> {
  list: Prayer[];
}

export function PrayersList({ list, className, ...props }: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <div className={twMerge("flex flex-wrap gap-4", className)} {...props}>
        {list.map((prayer) => {
          const description = prayer.cleanDescription || prayer.cleanBody;
          return (
            <Link
              key={prayer.id}
              href={`/oracoes/${encodeURIComponent(prayer.id)}`}
              className="w-full max-w-md"
            >
              <Card className="p-4 w-full">
                <Heading>{prayer.title}</Heading>
                <div className="flex items-center justify-between gap-4">
                  {description && <Text className="flex-1">{description}</Text>}
                  <HandleUserPrayerButton prayer={prayer} />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </Suspense>
  );
}

export function Loading() {
  return (
    <div className="flex flex-wrap gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton key={i} className="h-32 w-full max-w-md rounded" />
      ))}
    </div>
  );
}
