import { FilesRouter } from './files.router.js';
import { type FilesController } from '../controllers/files.controller.js';
import { type FilesInterceptor } from '../middleware/files.interceptor.js';

describe('Given an instance of the class FilesRouter', () => {
  const controller = {
    fileHandler: jest.fn(),
  } as unknown as FilesController;

  const interceptor = {
    singleFile: jest.fn(() => jest.fn()),
    cloudUpload: jest.fn(),
  } as unknown as FilesInterceptor;

  const router = new FilesRouter(controller, interceptor, 'avatar');

  test('Then it should be an instance of the class', () => {
    expect(router).toBeInstanceOf(FilesRouter);
  });
});
