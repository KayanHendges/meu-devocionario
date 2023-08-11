import { RelatedCategoriesSelectProps } from "@components/Selects/RelatedCategories/types";
import SingleSelect from "@components/Selects/SingleSelect";
import { categoriesProviders } from "@providers/api/categories";
import { produce } from "immer";
import { Category } from "project-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function RelatedCategoriesSelect({
  className,
  initialIds,
  onSelect,
  ...props
}: RelatedCategoriesSelectProps) {
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [selected, setSelected] = useState<Category[]>([]);

  const fetchCategories = useCallback(async () => {
    const { list } = await categoriesProviders.listCategories();
    setCategoriesList(list);
    if (!initialIds) return;

    const initial = list.filter((it) => initialIds.includes(it.id));
    setSelected(initial);
    if (onSelect) onSelect(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSelect = (categoryId: string) => {
    setSelected(
      produce((draft) => {
        const selectedCategory = categoriesList.find(
          (it) => it.id === categoryId
        );
        if (!selectedCategory) return;
        draft.push(selectedCategory);
        if (onSelect) onSelect(draft);
      })
    );
  };

  const options = useMemo(() => {
    return categoriesList.filter((it) => !selected.find((s) => s.id === it.id));
  }, [categoriesList, selected]);

  return (
    <div className={twMerge("", className)} {...props}>
      <SingleSelect onChange={({ target }) => handleSelect(target.value)}>
        <option value="">Selectionar</option>
        {options.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </SingleSelect>
      <div className="flex">
        {selected.map(({ id, name }) => (
          <span key={id}>{name}</span>
        ))}
      </div>
    </div>
  );
}
