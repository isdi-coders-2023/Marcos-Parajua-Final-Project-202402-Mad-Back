import { type PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { HttpError } from '../middleware/errors.middleware.js';
import { type Article, type ArticleCreateDto } from '../entities/article.js';
import { type Repo } from './baseRepo.js';
const debug = createDebug('BOOKS:articles:repository:sql');

const select = {
  id: true,
  title: true,
  subtitle: true,
  avatar: true,
  authorId: true,
  maker: true,
  author: {
    select: {
      id: true,
      name: true,
    },
  },
  content: true,
};

export class ArticlesSqlRepo implements Repo<Article, ArticleCreateDto> {
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated articles sql repository');
  }

  async readAll(): Promise<Article[]> {
    return this.prisma.article.findMany({
      select,
    }) as Promise<Article[]>;
  }

  async readById(id: string): Promise<Article> {
    const article = await this.prisma.article.findUnique({
      where: { id },
      select,
    });

    if (!article) {
      throw new HttpError(404, 'Not Found', `Article ${id} not found`);
    }

    return article as Article;
  }

  async create(data: ArticleCreateDto): Promise<Article> {
    try {
      const newArticle = await this.prisma.article.create({
        data: {
          ...data,
          content: data.content ?? '',
        },
        select,
      });
      return newArticle as Article;
    } catch (error) {
      throw new HttpError(
        500,
        'Internal Server Error',
        'Error creating article'
      );
    }
  }

  async update(id: string, data: Partial<ArticleCreateDto>) {
    const article = await this.prisma.article.findUnique({
      where: { id },
    });
    if (!article) {
      throw new HttpError(404, 'Not Found', `Article ${id} not found`);
    }

    const updatedArticle = await this.prisma.article.update({
      where: { id },
      data,
      select,
    });

    return updatedArticle as Article;
  }

  async delete(id: string): Promise<Article> {
    const article = await this.prisma.article.findUnique({
      where: { id },
    });
    if (!article) {
      throw new HttpError(404, 'Not Found', `Article ${id} not found`);
    }

    const deletedArticle = await this.prisma.article.delete({
      where: { id },
      select,
    });
    return deletedArticle as Article;
  }
}
