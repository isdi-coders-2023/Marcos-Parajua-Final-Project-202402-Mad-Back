/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type Request, type Response, type NextFunction } from 'express';
import { ArticlesController } from './articles.controller.js';
import { type Repo } from '../repositories/baseRepo.js';
import { type ObjectSchema } from 'joi';
import { type Article, type ArticleCreateDto } from '../entities/article.js';
import { type Payload } from '../services/auth.service.js';

jest.mock('../entities/article.schema.js', () => ({
  articleCreateDtoSchema: {
    validate: jest.fn().mockReturnValue({ error: null, value: {} }),
  } as unknown as ObjectSchema<ArticleCreateDto>,
  articleUpdateDtoSchema: {
    validate: jest.fn().mockReturnValue({ error: null, value: {} }),
  } as unknown as ObjectSchema<ArticleCreateDto>,
}));

describe('Given an instance of the class ArticlesController', () => {
  const repo = {
    readAll: jest.fn(),
    readById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as Repo<Article, ArticleCreateDto>;

  const req = {} as unknown as Request;
  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  } as unknown as Response;
  const next = jest.fn();

  const controller = new ArticlesController(repo);

  test('Then it should be an instance of the class', () => {
    expect(controller).toBeInstanceOf(ArticlesController);
  });

  describe('When we use the method create', () => {
    describe('And body is not valid', () => {
      test.skip('Then it should call next with an error', async () => {
        req.body = {};
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
        const payload = { id: 'authorId' } as Payload;
        const article = {
          title: 'Test Article',
          content: 'Content',
          payload,
        } as ArticleCreateDto & { payload: Payload };

        req.body = article;
        await controller.create(req, res, next);
        expect(repo.create).toHaveBeenCalledWith({
          title: 'Test Article',
          content: 'Content',
          authorId: 'authorId',
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
      });
    });

    describe('And an error is thrown during creation', () => {
      test('Then it should call next with an error', async () => {
        (repo.create as jest.Mock).mockRejectedValueOnce(
          new Error('Create error')
        );
        const payload = { id: 'authorId' } as Payload;
        const article = {
          title: 'Test Article',
          content: 'Content',
          payload,
        } as ArticleCreateDto & { payload: Payload };

        req.body = article;
        await controller.create(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(Error));
      });
    });
  });
});
