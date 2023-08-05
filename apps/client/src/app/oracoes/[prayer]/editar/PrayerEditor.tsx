"use client";

import PageContainer from "@components/Container/Page";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Prayer } from "project-types";

interface Props {
  prayer: Prayer;
}

export default function PrayerEditor({ prayer }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: prayer.body,
    autofocus: true,
    editorProps: {
      attributes: {
        class: "outline-none h-full",
      },
    },
  });

  return (
    <PageContainer>
      <EditorContent
        className="w-full text-black dark:text-white prose prose-invert"
        editor={editor}
      />
    </PageContainer>
  );
}
