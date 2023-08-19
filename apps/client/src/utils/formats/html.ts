export const replaceHtmlEntites = (str: string): string => {
  const translate_re = /&(nbsp|amp|quot|lt|gt);/g;
  const translate = {
    nbsp: " ",
    amp: "&",
    quot: '"',
    lt: "<",
    gt: ">",
  };

  return str.replace(
    translate_re,
    (_, entity) => translate[entity as keyof typeof translate]
  );
};
