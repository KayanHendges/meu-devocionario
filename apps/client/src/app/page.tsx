"use client";

import Card from "@components/Card";
import { Heading } from "@components/Texts/Heading";
import { Text } from "@components/Texts/Text";
import { prayersProviders } from "@providers/api/prayers";
import { useEffect, useState } from "react";
import { Prayer } from "project-types";

export default function Home() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);

  const fetchPrayers = async () => {
    const { list } = await prayersProviders.listPrayers();
    setPrayers(list);
  };

  useEffect(() => {
    fetchPrayers();
  }, []);

  return (
    <div className="flex flex-col p-2">
      <div className="space-y-2">
        {prayers.map(({ id, title, description }) => (
          <Card key={id}>
            <Heading>{title}</Heading>
            {description && <Text>{description}</Text>}
          </Card>
        ))}
      </div>
    </div>
  );
}
