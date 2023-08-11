"use client";
import HtmlEditor from "@components/HtmlEditor";
import { Category, Prayer } from "project-types";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { EditPrayerFormSchema } from "@components/forms/EditPrayer/EditPrayerForm";
import { CreatePrayerPayload } from "@providers/api/prayers/types";
import { Text } from "@components/Texts/Text";
import { FormEvent, useState } from "react";
import CategorySelect from "@components/Selects/Category";
import TextInput from "@components/Inputs/Text";
import { handleSubmit } from "@utils/forms";
import RelatedCategoriesSelect from "@components/Selects/RelatedCategories";

interface Props {
  prayer: Prayer;
}

export default function EditPrayerForm({
  prayer: {
    title,
    description,
    body,
    categoryId,
    language,
    relatedCategoriesId,
  },
}: Props) {
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
    try {
      const payload = await handleSubmit(form);
      console.log({ payload });
    } catch (error) {
      console.log(error);
    }
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
      <label className="label">
        <Text className="label-text">Descrição (opcional)</Text>
      </label>
      <HtmlEditor
        onHtmlChange={(html: string) => form.setValue("description", html)}
        initialContent={form.getValues("description") || ""}
      />
      <label className="label">
        <Text className="label-text">Oração</Text>
      </label>
      <HtmlEditor
        onHtmlChange={(html: string) => form.setValue("body", html)}
        initialContent={form.getValues("body")}
      />
      <CategorySelect
        initialCategoryId={form.getValues("categoryId")}
        onSelect={({ id }) => form.setValue("categoryId", id)}
      />
      <RelatedCategoriesSelect initialIds={relatedCategoriesId} />
      <button className="btn btn-primary">Primary</button>
    </form>
  );
}
