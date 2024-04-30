import Joi from 'joi';
import { type UserCreateDto, type UserUpdateDto } from './user';

export const userCreateDtoSchema = Joi.object<UserCreateDto>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required(),
  avatar: Joi.string().allow('', null),

  role: Joi.string().valid('admin', 'user').required(),
});

export const userUpdateDtoSchema = Joi.object<UserUpdateDto>({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  repeatPassword: Joi.string(),
  avatar: Joi.string().allow('', null),

  role: Joi.string().valid('admin', 'user'),
});
