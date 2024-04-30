import Joi from 'joi';
import { type BookCreateDto, type BookUpdateDto } from './book.js';

export const bookCreateDtoSchema = Joi.object<BookCreateDto>({
  title: Joi.string().required(),
  author: Joi.string().required(),
  year: Joi.number().integer().min(0).required(),
  isbn: Joi.string().required(),
  coverUrl: Joi.string().uri().required(),
  description: Joi.string().required(),
});

export const bookUpdateDtoSchema = Joi.object<BookUpdateDto>({
  title: Joi.string(),
  author: Joi.string(),
  year: Joi.number().integer().min(0),
  isbn: Joi.string(),
  coverUrl: Joi.string().uri(),
  description: Joi.string(),
});
