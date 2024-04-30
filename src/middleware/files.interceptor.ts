/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextFunction, type Request, type Response } from 'express';
import createDebug from 'debug';

import { v2 as cloudinary } from 'cloudinary';
import { HttpError } from './errors.middleware.js';
import multer from 'multer';

const debug = createDebug('BOOKS:files:interceptor');

export class FilesInterceptor {
  constructor() {
    debug('Instantiated files interceptor');
  }

  singleFile(fieldName = 'avatar') {
    const storage = multer.diskStorage({
      destination: 'uploads/',
      filename(
        _req: Request,
        file: Express.Multer.File,
        callback: (error: Error, filename: string) => void
      ) {
        callback(new Error(), Date.now() + '_' + file.originalname);
      },
    });

    const upload = multer({ storage });
    const middleware = upload.single(fieldName);

    return (req: Request, res: Response, next: NextFunction) => {
      const previousBody = { ...req.body };
      middleware(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
          next(new HttpError(400, 'Bad Request', err.message));
          return;
        }

        if (err) {
          next(
            new HttpError(500, 'Internal Server Error', 'File upload error')
          );
          return;
        }

        req.body = { ...previousBody, ...req.body };
        next();
      });
    };
  }

  async upload(req: Request, res: Response, next: NextFunction) {
    const options = {
      useFilename: true,
      uniqueFilename: false,
      overwrite: true,
    };
    if (!req.file) {
      next(new HttpError(400, 'Bad Request', 'No file uploaded'));
      return;
    }

    try {
      const result = await cloudinary.uploader.upload(req.file.path, options);
      req.body.cloudinary = result;
      next();
    } catch (error) {
      next(new HttpError(500, 'Internal Server Error', 'Error uploading file'));
    }
  }
}
