import { type User } from './user.js';

export type Article = {
  id: string;
  title: string;
  subtitle?: string | undefined;
  avatar?: string | undefined;
  author: Partial<User>;
  authorId: string;
  content: string;
  maker?: string;
  createdAt?: string;
  updatedAt?: string;
};
export type ArticleCreateDto = {
  title: string;
  authorId: string;
  maker?: string;
  content?: string;
  avatar?: string;
  subtitle?: string;
};

export type ArticleUpdateDto = Partial<ArticleCreateDto>;
