"use client";

import Button from "@/components/Buttons/Button";
import ClaimContainer from "@/components/Container/Claim";
import { categoriesProviders } from "@/providers/api/categories";
import { useRouter } from "next/navigation";
import { ComponentPropsWithoutRef, useState } from "react";

interface Props extends ComponentPropsWithoutRef<"button"> {
  categoryId: string;
}

export default function DeleteCategoryButton({ categoryId, ...props }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const deleteCategory = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await categoriesProviders.deleteCategory(categoryId);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);

    router.back();
  };

  return (
    <ClaimContainer requiredClaims={["category.delete"]}>
      <Button onClick={deleteCategory} isLoading={isLoading} {...props} />
    </ClaimContainer>
  );
}
