import PageContainer from "@components/Container/Page";
import CreateOrUpdateCategoryForm from "@components/forms/CreateOrUpdateCategory";
import { categoriesProviders } from "@providers/api/categories";

interface Props {
  params: { categoryId: string };
}

export default async function EditPrayerPage({ params }: Props) {
  const category = await categoriesProviders.getCategory(
    decodeURIComponent(params.categoryId)
  );

  return (
    <PageContainer
      header="Editar Caregoria"
      backButton={`../${encodeURIComponent(category.id)}`}
    >
      <title>{category.name}</title>
      <CreateOrUpdateCategoryForm category={category} />
    </PageContainer>
  );
}