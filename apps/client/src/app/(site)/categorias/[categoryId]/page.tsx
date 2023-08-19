import { categoriesProviders } from "@providers/api/categories";
import { prayersProviders } from "@providers/api/prayers";
import CategoryContainer from "@sites/categorias/[categoryId]/CategoryContainer";
import PrayerContainer from "@sites/oracoes/[prayerId]/PrayerContainer";
import { Metadata } from "next";
import { cache } from "react";

interface Props {
  params: { categoryId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const getCategory = cache(async () =>
    categoriesProviders.getCategory(decodeURIComponent(params.categoryId))
  );

  const { name, cleanDescription } = await getCategory();

  return {
    title: name,
    description: cleanDescription,
    openGraph: {
      type: "article",
      title: name,
      description: cleanDescription || undefined,
    },
  };
}

export default function Page({ params }: Props) {
  const { categoryId } = params;
  return <CategoryContainer categoryId={decodeURIComponent(categoryId)} />;
}
