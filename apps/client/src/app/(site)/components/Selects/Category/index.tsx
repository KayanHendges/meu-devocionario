"use client";
import { CategorySelectProps } from "@components/Selects/Category/types";
import SingleSelect from "@components/Selects/SingleSelect";
import { categoriesProviders } from "@providers/api/categories";
import { NestedKeysSatifiesType } from "@utils/types";
import { Category } from "project-types";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, PathValue } from "react-hook-form";

export default function CategorySelect({
  onSelect,
  initialCategoryId,
  ...props
}: CategorySelectProps) {
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const fetchCategories = useCallback(async () => {
    const { list } = await categoriesProviders.listCategories();
    setCategoriesList(list);
    if (!initialCategoryId) return;

    const initial = list.find((it) => it.id === initialCategoryId);
    if (initial) setSelectedCategory(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (categoryId: string) => {
    const selectedCategory = categoriesList.find((it) => it.id === categoryId);

    if (!selectedCategory) return;

    if (onSelect) onSelect(selectedCategory);
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <SingleSelect
      onChange={({ target }) => handleSelect(target.value)}
      {...props}
    >
      {categoriesList.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </SingleSelect>
  );
}
