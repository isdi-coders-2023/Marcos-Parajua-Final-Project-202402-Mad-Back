import { type NextFunction, type Request, type Response } from 'express';
import createDebug from 'debug';
import { type BookCreateDto, type Book } from '../entities/book.js';
import {
  bookCreateDtoSchema,
  bookUpdateDtoSchema,
} from '../entities/book.schema.js';
import { type Repo } from '../repositories/baseRepo.js';
import { BaseController } from './baseController.js';

const debug = createDebug('BOOKS:books:controller');

export class BooksController extends BaseController<Book, BookCreateDto> {
  constructor(protected readonly repo: Repo<Book, BookCreateDto>) {
    super(repo, bookCreateDtoSchema, bookUpdateDtoSchema);

    debug('Instantiated book controller');
  }
}
