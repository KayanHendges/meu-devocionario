export const stripHtml = (html: string): string => {
  return html.toString().replace(/(<([^>]+)>)/gi, '');
};
