import { RelatedCategoriesSelectProps } from "@/components/Selects/RelatedCategories/types";
import SingleSelect from "@/components/Selects/SingleSelect";
import { produce } from "immer";
import { Category } from "project-common";
import { useCallback, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { X } from "phosphor-react";
import { categoriesProviders } from "@/providers/api/categories";
import { Badge } from "@/components/ui/badge";

export default function RelatedCategoriesSelect({
  className,
  initialIds,
  onSelect,
  label,
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

  const handleRemoveItem = (categoryId: string) => {
    setSelected(
      produce((draft) => {
        const index = draft.findIndex((it) => it.id === categoryId);
        if (typeof index !== "number") return;
        draft.splice(index, 1);
        if (onSelect) onSelect(draft);
      })
    );
  };

  const options = useMemo(() => {
    return categoriesList.filter((it) => !selected.find((s) => s.id === it.id));
  }, [categoriesList, selected]);

  return (
    <div
      className={twMerge("w-full flex flex-col gap-4", className)}
      {...props}
    >
      <SingleSelect
        label={label}
        onChange={({ target }) => handleSelect(target.value)}
      >
        {options.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </SingleSelect>
      <div className="flex flex-wrap gap-1">
        {selected.map(({ id, name }) => (
          <Badge
            key={id}
            className="gap-2"
            onClick={() => handleRemoveItem(id)}
          >
            {name}
            <X size={16} />
          </Badge>
        ))}
      </div>
    </div>
  );
}
