import PageContainer from "@components/Container/Page";
import CreateOrUpdateCategoryForm from "@components/forms/CreateOrUpdateCategory";

export default async function CreateCategoryPage() {
  return (
    <PageContainer header="Criar Categoria">
      <CreateOrUpdateCategoryForm />
    </PageContainer>
  );
}
