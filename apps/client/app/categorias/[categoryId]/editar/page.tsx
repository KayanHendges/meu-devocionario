import CreateOrUpdateCategoryForm from "@/components/Forms/CreateOrUpdateCategory";
import { categoriesProviders } from "@/providers/api/categories";

interface Props {
  params: { categoryId: string };
}

export default async function EditPrayerPage({ params }: Props) {
  const category = await categoriesProviders.getCategory(
    decodeURIComponent(params.categoryId),
    { cache: "no-cache" }
  );

  return (
    <>
      <title>{category.name}</title>
      <CreateOrUpdateCategoryForm category={category} />
    </>
  );
}
