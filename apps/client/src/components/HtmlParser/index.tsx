import { HtmlHTMLAttributes } from "react";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  children: string;
}

export default function HtmlParser({ children, className, ...props }: Props) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: children }}
      {...props}
    />
  );
}
