import Joi from 'joi';
import { type ArticleCreateDto, type ArticleUpdateDto } from './article.js';

export const articleCreateDtoSchema = Joi.object<ArticleCreateDto>({
  title: Joi.string().required(),
  subtitle: Joi.string().allow('', null),
  avatar: Joi.string().allow('', null),
  authorId: Joi.string().required(),
  content: Joi.string().required(),
  maker: Joi.string().allow('', null),
});

export const articleUpdateDtoSchema = Joi.object<ArticleUpdateDto>({
  title: Joi.string(),
  subtitle: Joi.string().allow('', null),
  avatar: Joi.string().allow('', null),
  authorId: Joi.string(),
  maker: Joi.string().allow('', null),
  content: Joi.string(),
});
