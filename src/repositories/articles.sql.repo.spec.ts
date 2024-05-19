import { type PrismaClient } from '@prisma/client';
import { ArticlesSqlRepo } from './articles.sql.repo.js';
import { HttpError } from '../middleware/errors.middleware.js';
import { type ArticleCreateDto } from '../entities/article.js';

const mockPrisma = {
  article: {
    findMany: jest.fn().mockResolvedValue([]),
    findUnique: jest.fn().mockResolvedValue({ id: '1' }),
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({}),
  },
} as unknown as PrismaClient;

describe('Given an instance of the class ArticlesSqlRepo', () => {
  const repo = new ArticlesSqlRepo(mockPrisma);

  test('Then it should be an instance of the class', () => {
    expect(repo).toBeInstanceOf(ArticlesSqlRepo);
  });

  describe('When we use the method readAll', () => {
    test('Then it should call prisma.findMany', async () => {
      const result = await repo.readAll();
      expect(mockPrisma.article.findMany).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When we use the method readById with a valid ID', () => {
    test('Then it should call prisma.findUnique', async () => {
      const result = await repo.readById('1');
      expect(mockPrisma.article.findUnique).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('When we use the method readById with an invalid ID', () => {
    test('Then it should throw an error', async () => {
      (mockPrisma.article.findUnique as jest.Mock).mockResolvedValueOnce(null);
      await expect(repo.readById('2')).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Article 2 not found')
      );
    });
  });

  describe('When we use the method create', () => {
    test('Then it should call prisma.create', async () => {
      const data = {} as unknown as ArticleCreateDto;
      const result = await repo.create(data);
      expect(mockPrisma.article.create).toHaveBeenCalled();
      expect(result).toEqual({});
    });

    test.skip('Then it should throw an error if create fails', async () => {
      (mockPrisma.article.create as jest.Mock).mockRejectedValueOnce(
        new Error('Failed to create article')
      );

      const data = {} as unknown as ArticleCreateDto;

      await expect(repo.create(data)).rejects.toThrow(
        new HttpError(500, 'Internal Server Error', 'Failed to create article')
      );

      expect(mockPrisma.article.create).toHaveBeenCalled();
    });
  });

  describe('When we use the method update with a valid ID', () => {
    test('Then it should call prisma.update', async () => {
      const result = await repo.update('1', {});
      expect(mockPrisma.article.update).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });

  describe('When we use the method update with an invalid ID', () => {
    test('Then it should throw an error', async () => {
      (mockPrisma.article.findUnique as jest.Mock).mockResolvedValueOnce(null);
      await expect(repo.update('2', {})).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Article 2 not found')
      );
    });
  });

  describe('When we use the method delete with a valid ID', () => {
    test('Then it should call prisma.delete', async () => {
      const result = await repo.delete('1');
      expect(mockPrisma.article.delete).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });

  describe('When we use the method delete with an invalid ID', () => {
    test('Then it should throw an error', async () => {
      (mockPrisma.article.findUnique as jest.Mock).mockResolvedValueOnce(null);
      await expect(repo.delete('2')).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Article 2 not found')
      );
    });
  });
});
