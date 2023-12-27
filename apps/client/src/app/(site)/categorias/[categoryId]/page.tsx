import cachedRequests from "@config/cachedRequests";
import { categoriesProviders } from "@providers/api/categories";
import CategoryContainer from "@sites/categorias/[categoryId]/CategoryContainer";
import { Metadata } from "next";

interface Props {
  params: { categoryId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name, cleanDescription } = await categoriesProviders.getCategory(
    params.categoryId,
    { next: { ...cachedRequests.categories.get, tags: [params.categoryId] } }
  );

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
