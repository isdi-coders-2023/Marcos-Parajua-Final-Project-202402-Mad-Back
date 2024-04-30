/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type Request, type Response } from 'express';
import { FilesInterceptor } from './files.interceptor.js';
import multer, { type MulterError } from 'multer';
import { v2 } from 'cloudinary';
import { HttpError } from './errors.middleware.js';

jest.mock('multer');
jest.mock('cloudinary');

describe('Given a instance of the class FilesInterceptor', () => {
  const interceptor = new FilesInterceptor();
  const req = {
    body: {},
    file: {},
  } as unknown as Request;
  const res = {} as unknown as Response;
  const next = jest.fn();
  test('Then it should be instance of the class', () => {
    expect(interceptor).toBeInstanceOf(FilesInterceptor);
  });
  describe('When we use the method singleFile', () => {
    const mockMiddleware = jest.fn();

    multer.diskStorage = jest.fn().mockImplementation(({ filename }) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      filename('', '', () => {
        //
      })
    );

    (multer as unknown as jest.Mock).mockReturnValue({
      single: jest.fn().mockReturnValue(mockMiddleware),
    });

    test('Then it should call Multer middleware', () => {
      interceptor.singleFile()(req, res, next);
      expect(mockMiddleware).toHaveBeenCalled();
    });
  });

  describe('When we use the method cloudinaryUpload', () => {
    v2.uploader = {
      upload: jest.fn().mockResolvedValue({}),
    } as unknown as typeof v2.uploader;

    describe('And file is valid', () => {
      test('Then it should call next', async () => {
        req.file = {} as unknown as Express.Multer.File;
        await interceptor.upload(req, res, next);
        expect(v2.uploader.upload).toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      });
    });
    describe('And file is not valid', () => {
      test('Then it should call next', async () => {
        req.file = undefined;
        await interceptor.upload(req, res, next);
        expect(v2.uploader.upload).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(
          new HttpError(400, 'Bad Request', 'No file uploaded')
        );
      });
    });
  });
});
