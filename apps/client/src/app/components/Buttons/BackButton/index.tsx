"use client";
import Button from "@components/Buttons/Button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "phosphor-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      type="button"
      onClick={() => router.back()}
      className="btn-square p-0"
    >
      <ArrowLeft size={24} />
    </Button>
  );
}
