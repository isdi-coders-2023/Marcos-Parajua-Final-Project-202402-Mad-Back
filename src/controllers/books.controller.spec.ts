/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type Request, type Response, type NextFunction } from 'express';
import { BooksController } from './books.controller.js';
import { type Repo } from '../repositories/baseRepo.js';
import { type ObjectSchema } from 'joi';
import { type Book, type BookCreateDto } from '../entities/book.js';
import { bookCreateDtoSchema } from '../entities/book.schema.js';
jest.mock('../entities/book.schema.js', () => ({
  bookCreateDtoSchema: {
    validate: jest.fn().mockReturnValue({ error: null, value: {} }),
  } as unknown as ObjectSchema<BookCreateDto>,
  bookUpdateDtoSchema: {
    validate: jest.fn().mockReturnValue({ error: null, value: {} }),
  } as unknown as ObjectSchema<BookCreateDto>,
}));

describe('Given an instance of the class BooksController', () => {
  const repo = {
    readAll: jest.fn(),
    readById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as Repo<Book, BookCreateDto>;

  const req = {} as unknown as Request;
  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  } as unknown as Response;
  const next = jest.fn();

  const controller = new BooksController(repo);

  test('Then it should be an instance of the class', () => {
    expect(controller).toBeInstanceOf(BooksController);
  });

  describe('When we use the method create', () => {
    describe('And body is not valid', () => {
      test('Then it should call next with an error', async () => {
        req.body = {};
        (bookCreateDtoSchema.validate as jest.Mock).mockReturnValueOnce({
          error: new Error('validation error'),
          value: {},
        });

        await controller.create(req, res, next);
        expect(next).toHaveBeenCalledWith(
          expect.objectContaining({
            message: expect.stringContaining('validation error'),
          })
        );
      });
    });

    describe('And body is valid', () => {
      test.skip('Then it should call repo.create', async () => {
        const book = {
          title: 'Test Book',
          author: 'Test Author',
        } as BookCreateDto;

        req.body = book;
        await controller.create(req, res, next);
        expect(repo.create).toHaveBeenCalledWith(book);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
      });
    });

    describe('And an error is thrown during creation', () => {
      test('Then it should call next with an error', async () => {
        (repo.create as jest.Mock).mockRejectedValueOnce(
          new Error('Create error')
        );
        const book = {
          title: 'Test Book',
          author: 'Test Author',
        } as BookCreateDto;

        req.body = book;
        await controller.create(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(Error));
      });
    });
  });
});
