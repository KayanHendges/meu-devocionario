import Card from "@components/Card";
import { Heading } from "@components/Texts/Heading";
import { Text } from "@components/Texts/Text";
import { prayersProviders } from "@providers/api/prayers";

export default async function Home() {
  const { list } = await prayersProviders.listPrayers();

  return (
    <div className="flex flex-col p-2">
      <Heading>Orações</Heading>
      <div className="space-y-2">
        {list.map(({ id, title, description }) => (
          <Card key={id}>
            <Heading>{title}</Heading>
            {description && <Text>{description}</Text>}
          </Card>
        ))}
      </div>
    </div>
  );
}
