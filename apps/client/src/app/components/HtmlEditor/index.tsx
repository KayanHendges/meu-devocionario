"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface HtmlEditor extends Omit<ComponentProps<"div">, "ref"> {
  initialContent?: string;
  editorClassName?: string;
  onHtmlChange?: (html: string) => void;
}

export default function HtmlEditor({
  className,
  initialContent = "",
  editorClassName = "",
  onHtmlChange,
  ...props
}: HtmlEditor) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    autofocus: true,
    onUpdate: ({ editor }) => onHtmlChange && onHtmlChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: twMerge("outline-none h-full w-full", editorClassName),
      },
    },
  });

  return (
    <EditorContent
      className={twMerge(
        "w-full text-black dark:text-white prose prose-invert ring-1 ring-primary rounded px-4",
        className
      )}
      editor={editor}
      {...props}
    />
  );
}
