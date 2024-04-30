import { PrismaClient } from '@prisma/client';
import createDebug from 'debug';

const debug = createDebug('BOOKS:db.connect');
export const dbConnect = async () => {
  debug('Connecting to database');
  const prisma = new PrismaClient();
  return prisma;
};
