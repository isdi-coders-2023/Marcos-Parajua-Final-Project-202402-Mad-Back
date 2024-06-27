import debug from 'debug';
import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { type PrismaClient } from '@prisma/client';
import { AuthInterceptor } from './middleware/auth.interceptor.js';
import { UsersController } from './controllers/users.controller.js';
import { ErrorsMiddleware } from './middleware/errors.middleware.js';
import { FilesInterceptor } from './middleware/files.interceptor.js';
import { UsersSqlRepo } from './repositories/users.sql.repo.js';
import { UsersRouter } from './routers/users.router.js';
import { FilesController } from './controllers/files.controller.js';
import { FilesRouter } from './routers/files.router.js';
import { ArticlesController } from './controllers/articles.controller.js';
import { ArticlesSqlRepo } from './repositories/articles.sql.repo.js';
import { ArticlesRouter } from './routers/articles.router.js';
import { BooksController } from './controllers/books.controller.js';
import { BooksSqlRepo } from './repositories/books.sql.repo.js';
import { BooksRouter } from './routers/books.router.js';

export const createApp = () => {
  debug('Creating app');
  return express();
};

export const startApp = (app: Express, prisma: PrismaClient) => {
  debug('Starting app');
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: 'https://hyph4e.netlify.app',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    })
  );
  app.use(express.static('public'));

  const authInterceptor = new AuthInterceptor();
  const filesInterceptor = new FilesInterceptor();

  const articlesRepo = new ArticlesSqlRepo(prisma);
  const articlesController = new ArticlesController(articlesRepo);
  const articlesRouter = new ArticlesRouter(
    articlesController,
    authInterceptor,
    articlesRepo,
    filesInterceptor
  );
  app.use('/articles', articlesRouter.router);

  const usersRepo = new UsersSqlRepo(prisma);
  const usersController = new UsersController(usersRepo);
  const usersRouter = new UsersRouter(
    usersController,
    authInterceptor,
    filesInterceptor
  );
  app.use('/users', usersRouter.router);

  const filesController = new FilesController();
  const filesRouter = new FilesRouter(
    filesController,
    filesInterceptor,
    'avatar'
  );

  const booksRepo = new BooksSqlRepo(prisma);
  const booksController = new BooksController(booksRepo);
  const booksRouter = new BooksRouter(
    booksController,
    authInterceptor,
    filesInterceptor
  );
  app.use('/books', booksRouter.router);

  app.use('/files', filesRouter.router);
  const errorsMiddleware = new ErrorsMiddleware();
  app.use(errorsMiddleware.handle.bind(errorsMiddleware));
};
