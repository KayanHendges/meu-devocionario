export enum LanguageCodesEnum {
  pt_BR = "pt_BR",
  la = "la",
}

export type LanguageCodes = keyof typeof LanguageCodesEnum;

export interface Prayer {
  id: string;
  title: string;
  description: string | null;
  body: string;
  cleanBody: string;
  categoryId: string;
  relatedCategoriesId: string[];
  language: LanguageCodes;
  updatedAt: Date;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  cleanDescription: string | null;
  updatedAt: Date;
  createdAt: Date;
}

export interface ResponseList<T> {
  list: T[];
  count: number;
  page: number;
  pageSize: number;
}
