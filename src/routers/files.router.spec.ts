import { type FilesController } from '../controllers/files.controller.js';
import { type AuthInterceptor } from '../middleware/auth.interceptor.js';
import { type FilesInterceptor } from '../middleware/files.interceptor.js';
import { FilesRouter } from './files.router.js';

describe('Given a instance of the class FilesRouter', () => {
  const controller = {
    fileHandler: jest.fn(),
  } as unknown as FilesController;
  const interceptor = {
    singleFile: jest.fn().mockReturnValue(jest.fn()),
    upload: jest.fn(),
  } as unknown as FilesInterceptor;
  const router = new FilesRouter(controller, interceptor);
  test('Then it should be instance of the class', () => {
    expect(router).toBeInstanceOf(FilesRouter);
  });
});
