"use client";
import { Prayer } from "project-types";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { EditPrayerFormSchema } from "@components/forms/EditPrayer/EditPrayerForm";
import { Text } from "@components/Texts/Text";
import { FormEvent, useState } from "react";
import CategorySelect from "@components/Selects/Category";
import TextInput from "@components/Inputs/Text";
import { handleSubmit } from "@utils/forms";
import RelatedCategoriesSelect from "@components/Selects/RelatedCategories";
import { CreatePrayerPayload } from "@providers/api/prayers/types";
import { prayersProviders } from "@providers/api/prayers";
import HtmlEditor from "@components/HtmlEditor";

interface Props {
  prayer: Prayer;
}

export default function EditPrayerForm({
  prayer: {
    id: prayerId,
    title,
    description,
    body,
    categoryId,
    language,
    relatedCategoriesId,
  },
}: Props) {
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

  const form = useForm<CreatePrayerPayload>({
    resolver: joiResolver(EditPrayerFormSchema),
    values: {
      title,
      description,
      body,
      categoryId,
      language,
      relatedCategoriesId,
    },
  });

  const handlePrayer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmiting(true);
    try {
      const payload = await handleSubmit(form);
      prayersProviders.updatePrayer(prayerId, payload);
    } catch (error) {
      console.log(error);
    }
    setIsSubmiting(false);
  };

  return (
    <form
      className="form-control gap-4 w-full max-w-[720px]"
      onSubmit={handlePrayer}
    >
      <label className="label">
        <Text className="label-text">Título da Oração</Text>
      </label>
      <TextInput {...form.register("title")} />
      <div>
        <label className="label">
          <Text className="label-text">Descrição (opcional)</Text>
        </label>
        <HtmlEditor
          onHtmlChange={(html: string) => form.setValue("description", html)}
          initialContent={form.getValues("description") || ""}
        />
      </div>
      <div>
        <label className="label">
          <Text className="label-text">Oração</Text>
        </label>
        <HtmlEditor
          onHtmlChange={(html: string) => form.setValue("body", html)}
          initialContent={form.getValues("body")}
        />
      </div>
      <CategorySelect
        initialCategoryId={form.getValues("categoryId")}
        onSelect={({ id }) => form.setValue("categoryId", id)}
      />
      <RelatedCategoriesSelect
        label="opa"
        initialIds={relatedCategoriesId}
        onSelect={(list) =>
          form.setValue(
            "relatedCategoriesId",
            list.map((it) => it.id)
          )
        }
      />
      <button className="btn btn-primary">
        {isSubmiting ? "Editando" : "Editar"}
      </button>
    </form>
  );
}
