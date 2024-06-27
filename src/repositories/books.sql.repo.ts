import { type PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { HttpError } from '../middleware/errors.middleware.js';
import { type Book, type BookCreateDto } from '../entities/book.js';
import { type Repo } from './baseRepo.js';
const debug = createDebug('BOOKS:books:repository:sql');

const select = {
  id: true,
  title: true,
  year: true,
  isbn: true,
  author: true,
  avatar: true,
  description: true,
};
export class BooksSqlRepo implements Repo<Book, BookCreateDto> {
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated books sql repository');
  }

  async readAll(): Promise<Book[]> {
    return this.prisma.book.findMany({
      select,
    }) as Promise<Book[]>;
  }

  async readById(id: string): Promise<Book> {
    const book = await this.prisma.book.findUnique({
      where: { id },
      select,
    });

    if (!book) {
      throw new HttpError(404, 'Not Found', `Book ${id} not found`);
    }

    return book as Book;
  }

  async create(data: BookCreateDto): Promise<Book> {
    try {
      const newBook = await this.prisma.book.create({
        data: {
          ...data,
          description: data.description ?? '',
        },
        select,
      });
      return newBook as Book;
    } catch (error) {
      throw new HttpError(500, 'Internal Server Error', 'Error creating book');
    }
  }

  async update(id: string, data: BookCreateDto): Promise<Book> {
    try {
      const updatedBook = await this.prisma.book.update({
        where: { id },
        data: {
          ...data,
          description: data.description ?? '',
        },
        select,
      });
      return updatedBook as Book;
    } catch (error) {
      throw new HttpError(500, 'Internal Server Error', 'Error updating book');
    }
  }

  async delete(id: string): Promise<Book> {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });
    if (!book) {
      throw new HttpError(404, 'Not Found', `Book ${id} not found`);
    }

    const deletedBook = await this.prisma.book.delete({
      where: { id },
      select,
    });

    return deletedBook as Book;
  }
}
