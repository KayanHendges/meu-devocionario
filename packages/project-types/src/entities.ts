export enum LanguageCodesEnum {
  pt_BR = "pt_BR",
  la = "la",
}

export type LanguageCodes = keyof typeof LanguageCodesEnum;

export interface Prayer {
  id: string;
  title: string;
  description: string | null;
  cleanDescription: string | null;
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

export interface User {
  id: string;
  name: string;
  email: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface UserCredentials {
  id: string;
  userId: string;
  password?: string;
  googleId?: string;
  updatedAt: Date;
  createdAt: Date;
}
