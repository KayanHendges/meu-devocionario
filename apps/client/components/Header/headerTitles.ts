interface HeaderTitle {
  value: string;
  urlRegex: RegExp;
}

export const titles: HeaderTitle[] = [{ value: "Meu devocionario", urlRegex: /^\/$/g }];
