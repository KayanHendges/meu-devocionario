import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Category } from "project-common";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
  list: Category[];
}

export default async function CategoryList({
  list,
  className,
  ...props
}: Props) {
  // Array.from({ length: 8 }).forEach(() => list.push(list[0]));

  return (
    <div className={twMerge("flex flex-wrap gap-2", className)} {...props}>
      {list.map((category) => (
        <Link
          key={category.id}
          href={`/categorias/${encodeURIComponent(category.id)}`}
        >
          <Badge className="bg-brand dark:text-white dark:hover:text-brand dark:hover:bg-white">
            {category.name}
          </Badge>
        </Link>
      ))}
      <Link href={"/categorias"}>
        <Badge className="bg-brand dark:text-white dark:hover:text-brand dark:hover:bg-white">
          + categorias
        </Badge>
      </Link>
    </div>
  );
}
