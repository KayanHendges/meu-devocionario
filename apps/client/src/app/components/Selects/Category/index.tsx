"use client";
import { CategorySelectProps } from "@components/Selects/Category/types";
import SingleSelect from "@components/Selects/SingleSelect";
import { categoriesProviders } from "@providers/api/categories";
import { Category } from "project-types";
import { forwardRef, useCallback, useEffect, useState } from "react";

const CategorySelect = forwardRef<HTMLSelectElement, CategorySelectProps>(
  ({ onSelect, initialCategoryId, ...props }, ref) => {
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
      const selectedCategory = categoriesList.find(
        (it) => it.id === categoryId
      );

      if (!selectedCategory) return;

      if (onSelect) onSelect(selectedCategory);
      setSelectedCategory(selectedCategory);
    };

    useEffect(() => {
      fetchCategories();
    }, [fetchCategories]);

    return (
      <SingleSelect
        onChange={({ target }) => handleSelect(target.value)}
        value={selectedCategory?.id}
        {...props}
        ref={ref}
      >
        {categoriesList.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </SingleSelect>
    );
  }
);

CategorySelect.displayName = "CategorySelect";

export default CategorySelect;
