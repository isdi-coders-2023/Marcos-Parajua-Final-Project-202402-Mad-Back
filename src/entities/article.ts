import { type User } from './user.js';

export type Article = {
  id: string;
  title: string;
  subtitle: string | undefined;
  imageUrl?: string | undefined;
  author: User;
  authorId: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
};
export type ArticleCreateDto = Omit<Article, 'id' | 'createdAt' | 'updatedAt'>;
export type ArticleUpdateDto = Partial<ArticleCreateDto>;
