import { type NextFunction, type Request, type Response } from 'express';
import createDebug from 'debug';
import { type ArticleCreateDto, type Article } from '../entities/article.js';
import {
  articleCreateDtoSchema,
  articleUpdateDtoSchema,
} from '../entities/article.schema.js';
import { type Repo } from '../repositories/baseRepo.js';
import { BaseController } from './baseController.js';
import { type Payload } from '../services/auth.service.js';

const debug = createDebug('BOOKS:articles:controller');

export class ArticlesController extends BaseController<
  Article,
  ArticleCreateDto
> {
  constructor(protected readonly repo: Repo<Article, ArticleCreateDto>) {
    super(repo, articleCreateDtoSchema, articleUpdateDtoSchema);

    debug('Instantiated article controller');
  }

  async create(req: Request, res: Response, next: NextFunction) {
    debug('Creating article');
    req.body.authorId = (req.body.payload as Payload).id;

    const { payload, ...rest } = req.body as ArticleCreateDto & {
      payload: Payload;
    };
    req.body = rest;

    await super.create(req, res, next);
  }
}
