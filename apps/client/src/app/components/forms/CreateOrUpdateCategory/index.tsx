"use client";
import { Category } from "project-common";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { FormEvent, useMemo, useState } from "react";
import TextInput from "@components/Inputs/Text";
import { handleSubmit } from "@utils/forms";
import HtmlEditor from "@components/Html/HtmlEditor";
import Button from "@components/Buttons/Button";
import { useRouter } from "next/navigation";
import { CreateCategoryPayload } from "@providers/api/categories/types";
import { CreateOrUpdateCategoryFormSchema } from "@components/forms/CreateOrUpdateCategory/CreateOrUpdateCategory";
import { categoriesProviders } from "@providers/api/categories";

interface Props {
  category?: Category;
}

export default function CreateOrUpdateCategoryForm({ category }: Props) {
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<CreateCategoryPayload>({
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
    <form
      className="form-control gap-4 w-full max-w-[720px]"
      onSubmit={handleCategory}
    >
      <TextInput label="Título da Oração" {...form.register("name")} />
      <HtmlEditor
        label="Descrição (opcional)"
        onHtmlChange={(html: string) => form.setValue("description", html)}
        initialContent={form.getValues("description") || ""}
      />
      <Button isLoading={isSubmiting} primary>
        {buttonlabel.default}
      </Button>
    </form>
  );
}
