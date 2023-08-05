import PageContainer from "@components/Container/Page";
import { Heading } from "@components/Texts/Heading";
import { prayersProviders } from "@providers/api/prayers";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Prayer } from "project-types";
import { useCallback, useEffect, useState } from "react";
import PrayerEditor from "src/app/oracoes/[prayer]/editar/PrayerEditor";

interface Props {
  params: { prayer: string };
}

export default async function EditPrayerPage({ params }: Props) {
  const prayer = await prayersProviders.getPrayer(params.prayer);

  return (
    <PageContainer>
      <Heading>Criar Oração</Heading>
      <PrayerEditor prayer={prayer} />
    </PageContainer>
  );
}
