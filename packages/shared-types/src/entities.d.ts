export enum LanguageCodesEnum {
  pt_BR = "pt_BR",
  la = "la",
}

type LanguageCodes = keyof typeof LanguageCodesEnum;

interface Prayer {
  id: string;
  title: string;
  description: string | null;
  body: string;
  cleanBody: string;
  category: string;
  relatedCategories: string[];
  language: LanguageCodes;
  updatedAt: Date;
  createdAt: Date;
}
