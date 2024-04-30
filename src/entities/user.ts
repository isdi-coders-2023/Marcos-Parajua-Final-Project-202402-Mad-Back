import { type Article } from './article.js';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string | undefined;
  repeatPassword?: string | undefined;
  avatar?: string | undefined;
  createdAt: string;
  updatedAt: string;
  role: 'admin' | 'user';
  articles: Partial<Article[]>;
};

export type UserCreateDto = Omit<
  User,
  'id' | 'createdAt' | 'updatedAt' | 'articles'
> & {
  password: string;
  repeatPassword: string;
  avatar?: string | undefined;
};

export type UserUpdateDto = Partial<UserCreateDto>;

export type UserReadDto = Omit<
  User,
  'password' | 'repeatPassword' | 'createdAt' | 'updatedAt'
>;
