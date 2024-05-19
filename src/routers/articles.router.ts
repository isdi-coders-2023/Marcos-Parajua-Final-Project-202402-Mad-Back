import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { type ArticlesController } from '../controllers/articles.controller.js';
import { type AuthInterceptor } from '../middleware/auth.interceptor.js';
import { type ArticlesSqlRepo } from '../repositories/articles.sql.repo.js';
import { type FilesInterceptor } from '../middleware/files.interceptor.js';

const debug = createDebug('BOOKS:articles:router');

export class ArticlesRouter {
  router = createRouter();

  constructor(
    readonly controller: ArticlesController,
    readonly authInterceptor: AuthInterceptor,
    readonly articlesSqlRepo: ArticlesSqlRepo,
    readonly filesInterceptor: FilesInterceptor
  ) {
    debug('Instantiated articles router');

    this.router.get(
      '/',

      controller.getAll.bind(controller)
    );
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post(
      '/',
      filesInterceptor.singleFile('avatar'),
      filesInterceptor.cloudUpload.bind(filesInterceptor),
      authInterceptor.authentication.bind(authInterceptor),
      controller.create.bind(controller)
    );
    this.router.patch(
      '/:id',
      filesInterceptor.singleFile('avatar'),
      filesInterceptor.cloudUpload.bind(filesInterceptor),
      authInterceptor.authentication.bind(authInterceptor),
      authInterceptor
        .authorization(articlesSqlRepo, 'author')
        .bind(authInterceptor),
      controller.update.bind(controller)
    );
    this.router.delete(
      '/:id',
      authInterceptor.authentication.bind(authInterceptor),
      authInterceptor
        .authorization(articlesSqlRepo, 'author')
        .bind(authInterceptor),
      controller.delete.bind(controller)
    );
  }
}
