"use client";
import { CreatePrayerDTO, Prayer } from "project-common";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { FormEvent, useMemo, useState } from "react";
import CategorySelect from "@components/Selects/Category";
import TextInput from "@components/Inputs/Text";
import { handleSubmit } from "@utils/forms";
import RelatedCategoriesSelect from "@components/Selects/RelatedCategories";
import { prayersProviders } from "@providers/api/prayers";
import HtmlEditor from "@components/Html/HtmlEditor";
import { CreateOrUpdatePrayerFormSchema } from "@components/forms/CreateOrUpdatePrayer/CreateOrUpdatePrayer";
import Button from "@components/Buttons/Button";
import { useRouter } from "next/navigation";

interface Props {
  prayer?: Prayer;
}

export default function CreateOrUpdatePrayerForm({ prayer }: Props) {
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<CreatePrayerDTO>({
    resolver: joiResolver(CreateOrUpdatePrayerFormSchema),
    values: prayer
      ? {
          title: prayer.title,
          description: prayer.description,
          body: prayer.body,
          categoryId: prayer.categoryId,
          language: prayer.language,
          relatedCategoriesId: prayer.relatedCategoriesId,
        }
      : undefined,
  });

  const handlePrayer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmiting(true);
    try {
      const payload = await handleSubmit(form);

      const { id } = prayer
        ? await prayersProviders.updatePrayer(prayer.id, payload)
        : await prayersProviders.createPrayer(payload);

      const path = prayer ? `../` : "/oracoes";
      router.push(`${path}/${encodeURIComponent(id)}`);
    } catch (error) {
      console.log(error);
    }
    setIsSubmiting(false);
  };

  const buttonlabel = useMemo(
    () => (prayer ? { default: "Editar" } : { default: "Criar" }),
    [prayer]
  );

  return (
    <form
      className="form-control gap-4 w-full max-w-[720px]"
      onSubmit={handlePrayer}
    >
      <TextInput label="Título da Oração" {...form.register("title")} />
      <HtmlEditor
        label="Descrição (opcional)"
        onHtmlChange={(html: string) => form.setValue("description", html)}
        initialContent={form.getValues("description") || ""}
      />
      <HtmlEditor
        label="Oração"
        onHtmlChange={(html: string) => form.setValue("body", html)}
        initialContent={form.getValues("body")}
      />
      <CategorySelect
        label="Categoria Principal"
        initialCategoryId={form.getValues("categoryId")}
        onSelect={({ id }) => form.setValue("categoryId", id)}
      />
      <RelatedCategoriesSelect
        label="Categorias Relacionadas"
        initialIds={prayer?.relatedCategoriesId || []}
        onSelect={(list) =>
          form.setValue(
            "relatedCategoriesId",
            list.map((it) => it.id)
          )
        }
      />
      <Button isLoading={isSubmiting} primary>
        {buttonlabel.default}
      </Button>
    </form>
  );
}
