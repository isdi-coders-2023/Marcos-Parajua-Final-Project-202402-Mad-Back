import { type PrismaClient } from '@prisma/client';
import { BooksSqlRepo } from './books.sql.repo.js';
import { HttpError } from '../middleware/errors.middleware.js';
import { type BookCreateDto } from '../entities/book.js';

const mockPrisma = {
  book: {
    findMany: jest.fn().mockResolvedValue([]),
    findUnique: jest.fn().mockResolvedValue({
      id: '1',
      title: 'Test Book',
      year: 2021,
      isbn: '1234567890',
      author: 'Author',
      avatar: 'avatar.png',
      description: 'A test book',
    }),
    create: jest.fn().mockResolvedValue({
      id: '1',
      title: 'New Book',
      year: 2021,
      isbn: '0987654321',
      author: 'Author',
      avatar: 'avatar.png',
      description: 'A new book',
    }),
    update: jest.fn().mockResolvedValue({
      id: '1',
      title: 'Updated Book',
      year: 2021,
      isbn: '1234567890',
      author: 'Author',
      avatar: 'avatar.png',
      description: 'An updated book',
    }),
    delete: jest.fn().mockResolvedValue({
      id: '1',
      title: 'Deleted Book',
      year: 2021,
      isbn: '1234567890',
      author: 'Author',
      avatar: 'avatar.png',
      description: 'A deleted book',
    }),
  },
} as unknown as PrismaClient;

describe('Given an instance of the class BooksSqlRepo', () => {
  const repo = new BooksSqlRepo(mockPrisma);

  test('Then it should be an instance of the class', () => {
    expect(repo).toBeInstanceOf(BooksSqlRepo);
  });

  describe('When we use the method readAll', () => {
    test('Then it should call prisma.findMany', async () => {
      const result = await repo.readAll();
      expect(mockPrisma.book.findMany).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When we use the method readById with a valid ID', () => {
    test('Then it should call prisma.findUnique', async () => {
      const result = await repo.readById('1');
      expect(mockPrisma.book.findUnique).toHaveBeenCalled();
      expect(result).toEqual({
        id: '1',
        title: 'Test Book',
        year: 2021,
        isbn: '1234567890',
        author: 'Author',
        avatar: 'avatar.png',
        description: 'A test book',
      });
    });
  });

  describe('When we use the method readById with an invalid ID', () => {
    test('Then it should throw an error', async () => {
      (mockPrisma.book.findUnique as jest.Mock).mockResolvedValueOnce(null);
      await expect(repo.readById('2')).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Book 2 not found')
      );
    });
  });

  describe('When we use the method create', () => {
    test('Then it should call prisma.create', async () => {
      const data: BookCreateDto = {
        title: 'New Book',
        year: 2021,
        isbn: '0987654321',
        author: 'Author',
        avatar: 'avatar.png',
        description: 'A new book',
      };
      const result = await repo.create(data);
      expect(mockPrisma.book.create).toHaveBeenCalled();
      expect(result).toEqual({
        id: '1',
        title: 'New Book',
        year: 2021,
        isbn: '0987654321',
        author: 'Author',
        avatar: 'avatar.png',
        description: 'A new book',
      });
    });

    test('Then it should throw an error if create fails', async () => {
      (mockPrisma.book.create as jest.Mock).mockRejectedValueOnce(
        new Error('Failed to create book')
      );

      const data: BookCreateDto = {
        title: 'New Book',
        year: 2021,
        isbn: '0987654321',
        author: 'Author',
        avatar: 'avatar.png',
        description: 'A new book',
      };

      await expect(repo.create(data)).rejects.toThrow(
        new HttpError(500, 'Internal Server Error', 'Error creating book')
      );

      expect(mockPrisma.book.create).toHaveBeenCalled();
    });
  });

  describe('When we use the method update with a valid ID', () => {
    test('Then it should call prisma.update', async () => {
      const data: BookCreateDto = {
        title: 'Updated Book',
        year: 2021,
        isbn: '1234567890',
        author: 'Author',
        avatar: 'avatar.png',
        description: 'An updated book',
      };
      const result = await repo.update('1', data);
      expect(mockPrisma.book.update).toHaveBeenCalled();
      expect(result).toEqual({
        id: '1',
        title: 'Updated Book',
        year: 2021,
        isbn: '1234567890',
        author: 'Author',
        avatar: 'avatar.png',
        description: 'An updated book',
      });
    });
  });

  describe('When we use the method update with an invalid ID', () => {
    test.skip('Then it should throw an error', async () => {
      (mockPrisma.book.findUnique as jest.Mock).mockResolvedValueOnce(null);
      const data: BookCreateDto = {
        title: 'Updated Book',
        year: 2021,
        isbn: '1234567890',
        author: 'Author',
        avatar: 'avatar.png',
        description: 'An updated book',
      };
      await expect(repo.update('2', data)).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Book 2 not found')
      );
    });
  });

  describe('When we use the method delete with a valid ID', () => {
    test.skip('Then it should call prisma.delete', async () => {
      const result = await repo.delete('1');
      expect(mockPrisma.book.delete).toHaveBeenCalled();
      expect(result).toEqual({
        id: '1',
        title: 'Deleted Book',
        year: 2021,
        isbn: '1234567890',
        author: 'Author',
        avatar: 'avatar.png',
        description: 'A deleted book',
      });
    });
  });

  describe('When we use the method delete with an invalid ID', () => {
    test('Then it should throw an error', async () => {
      (mockPrisma.book.findUnique as jest.Mock).mockResolvedValueOnce(null);
      await expect(repo.delete('2')).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Book 2 not found')
      );
    });
  });
});
