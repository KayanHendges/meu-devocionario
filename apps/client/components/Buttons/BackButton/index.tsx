"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "phosphor-react";

interface Props {
  backButton: string | boolean;
}

export default function BackButton({ backButton }: Props) {
  const router = useRouter();

  return (
    <Button
      type="button"
      onClick={() => {
        if (backButton === true) router.back();
        else if (typeof backButton === "string") router.push(backButton);
      }}
      className=""
    >
      <ArrowLeft size={24} />
    </Button>
  );
}
