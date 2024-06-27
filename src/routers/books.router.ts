import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { type BooksController } from '../controllers/books.controller.js';
import { type AuthInterceptor } from '../middleware/auth.interceptor.js';

import { type FilesInterceptor } from '../middleware/files.interceptor.js';

const debug = createDebug('BOOKS:books:router');

export class BooksRouter {
  router = createRouter();

  constructor(
    readonly controller: BooksController,
    readonly authInterceptor: AuthInterceptor,
    readonly filesInterceptor: FilesInterceptor
  ) {
    debug('Instantiated books router');

    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post(
      '/',
      filesInterceptor.singleFile('avatar'),
      filesInterceptor.cloudUpload.bind(filesInterceptor),
      controller.create.bind(controller)
    );
    this.router.patch(
      '/:id',
      filesInterceptor.singleFile('avatar'),
      filesInterceptor.cloudUpload.bind(filesInterceptor),
      controller.update.bind(controller)
    );
    this.router.delete('/:id', controller.delete.bind(controller));
  }
}
