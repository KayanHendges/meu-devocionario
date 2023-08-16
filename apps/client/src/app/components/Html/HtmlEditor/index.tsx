"use client";
import LabelInput from "@components/Inputs/Label";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ComponentProps, Fragment } from "react";
import { twMerge } from "tailwind-merge";

interface HtmlEditor extends Omit<ComponentProps<"div">, "ref"> {
  label?: string;
  initialContent?: string;
  editorClassName?: string;
  onHtmlChange?: (html: string) => void;
}

export default function HtmlEditor({
  label,
  className,
  initialContent = "",
  editorClassName = "",
  onHtmlChange,
  ...props
}: HtmlEditor) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    onUpdate: ({ editor }) => onHtmlChange && onHtmlChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: twMerge("outline-none", editorClassName),
      },
    },
  });

  const Container = label ? "div" : Fragment;

  return (
    <Container>
      {label && <LabelInput>{label}</LabelInput>}
      <div className="ring-1 bg-zinc-200 dark:bg-zinc-900 ring-primary rounded p-4">
        <EditorContent
          className={twMerge(
            "w-full text-black dark:text-white prose darkprose-invert",
            className
          )}
          editor={editor}
          {...props}
        />
      </div>
    </Container>
  );
}
