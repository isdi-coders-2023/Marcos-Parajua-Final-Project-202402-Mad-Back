import { type PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { HttpError } from '../middleware/errors.middleware.js';
import { type User, type UserCreateDto } from '../entities/user.js';
import { type WithLoginRepo } from './baseRepo.js';

const debug = createDebug('BOOKS:users:repository:sql');

const select = {
  id: true,
  name: true,
  email: true,
  avatar: true,
  role: true,
  articles: {
    select: {
      id: true,
      title: true,
      subtitle: true,
      avatar: true,
      content: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          role: true,
        },
      },
    },
  },
};

export class UsersSqlRepo implements WithLoginRepo<User, UserCreateDto> {
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated users sql repository');
  }

  async readAll(): Promise<User[]> {
    return this.prisma.user.findMany({ select }) as Promise<User[]>;
  }

  async readById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select,
    });
    if (!user) {
      throw new HttpError(404, 'Not Found', `User ${id} not found`);
    }

    return user as User;
  }

  async searchForLogin(key: 'email' | 'name', value: string) {
    if (!['email', 'name'].includes(key)) {
      throw new HttpError(404, 'Not Found', 'Invalid query parameters');
    }

    const userData = await this.prisma.user.findFirst({
      where: { [key]: value },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: true,
        repeatPassword: true,
      },
    });

    if (!userData) {
      throw new HttpError(404, 'Not Found', `Invalid ${key} or password`);
    }

    return userData;
  }

  async create(data: UserCreateDto): Promise<User> {
    try {
      const newUser = await this.prisma.user.create({ data, select });
      return newUser as User;
    } catch (error) {
      throw new HttpError(
        500,
        'Internal Server Error',
        'Failed to create user'
      );
    }
  }

  async update(id: string, data: Partial<UserCreateDto>): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new HttpError(404, 'Not Found', `User ${id} not found`);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
      select,
    });
    return updatedUser as User;
  }

  async delete(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new HttpError(404, 'Not Found', `User ${id} not found`);
    }

    const deletedUser = await this.prisma.user.delete({
      where: { id },
      select,
    });
    return deletedUser as User;
  }
}
