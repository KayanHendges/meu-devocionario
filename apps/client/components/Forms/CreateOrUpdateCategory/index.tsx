"use client";
import { Category, CreateCategoryDTO } from "project-common";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { FormEvent, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { handleSubmit } from "@/utils/forms";
import HtmlEditor from "@/components/Html/HtmlEditor";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CreateOrUpdateCategoryFormSchema } from "@/components/Forms/CreateOrUpdateCategory/CreateOrUpdateCategory";
import { categoriesProviders } from "@/providers/api/categories";
import FormContainer from "@/components/Forms/FormContainer";

interface Props {
  category?: Category;
}

export default function CreateOrUpdateCategoryForm({ category }: Props) {
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<CreateCategoryDTO>({
    resolver: joiResolver(CreateOrUpdateCategoryFormSchema),
    values: category
      ? {
          name: category.name,
          description: category.description,
        }
      : undefined,
  });

  const handleCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmiting(true);
    try {
      const payload = await handleSubmit(form);

      const { id } = category
        ? await categoriesProviders.updateCategory(category.id, payload)
        : await categoriesProviders.createCategory(payload);

      const path = category ? `../` : "/categorias";
      router.push(`${path}/${encodeURIComponent(id)}`);
    } catch (error) {
      console.log(error);
    }
    setIsSubmiting(false);
  };

  const buttonlabel = useMemo(
    () => (category ? { default: "Editar" } : { default: "Criar" }),
    [category]
  );

  return (
    <FormContainer onSubmit={handleCategory}>
      <Input label="Título da Oração" {...form.register("name")} />
      <HtmlEditor
        label="Descrição (opcional)"
        onHtmlChange={(html: string) => form.setValue("description", html)}
        initialContent={form.getValues("description") || ""}
      />
      <Button isLoading={isSubmiting} variant={"primary"}>
        {buttonlabel.default}
      </Button>
    </FormContainer>
  );
}
