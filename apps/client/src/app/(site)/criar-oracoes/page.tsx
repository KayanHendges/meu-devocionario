"use client";

import PageContainer from "@components/Container/Page";
import { Heading } from "@components/Texts/Heading";
import { Text } from "@components/Texts/Text";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function CreatePrayer() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: ``,
    autofocus: true,
    editorProps: {
      attributes: {
        class: "outline-none h-full",
      },
    },
  });

  return (
    <PageContainer>
      <Heading>Criar Oração</Heading>
      <EditorContent
        className="w-full dark:text-white prose prose-invert"
        editor={editor}
      />
    </PageContainer>
  );
}
