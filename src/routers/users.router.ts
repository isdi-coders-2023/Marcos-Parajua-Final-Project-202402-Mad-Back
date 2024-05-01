import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { type UsersController } from '../controllers/users.controller.js';
import { type AuthInterceptor } from '../middleware/auth.interceptor.js';
import { type FilesInterceptor } from '../middleware/files.interceptor.js';

const debug = createDebug('BOOKS:users:router');

export class UsersRouter {
  router = createRouter();

  constructor(
    readonly controller: UsersController,
    readonly authInterceptor: AuthInterceptor,
    readonly filesInterceptor: FilesInterceptor
  ) {
    debug('Instantiated users router');

    this.router.post(
      '/signup',
      filesInterceptor.singleFile('avatar'),
      filesInterceptor.upload.bind(filesInterceptor),
      controller.create.bind(controller)
    );
    this.router.post('/login', controller.login.bind(controller));

    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));

    this.router.patch(
      '/:id',
      authInterceptor.authentication.bind(authInterceptor),
      controller.update.bind(controller)
    );
    this.router.delete(
      '/:id',
      authInterceptor.authentication.bind(authInterceptor),
      controller.delete.bind(controller)
    );
  }
}
