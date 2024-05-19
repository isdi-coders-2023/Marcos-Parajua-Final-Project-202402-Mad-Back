import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { type FilesController } from '../controllers/files.controller.js';
import { type FilesInterceptor } from '../middleware/files.interceptor.js';

const debug = createDebug('BOOKS:files:router');
export class FilesRouter {
  router = createRouter();

  constructor(
    readonly controller: FilesController,
    readonly interceptor: FilesInterceptor,
    readonly fieldName: string
  ) {
    debug('Instantiated files router with field:', fieldName);

    this.router.post(
      '/',
      this.interceptor.singleFile(this.fieldName).bind(this.interceptor),
      this.interceptor.cloudUpload.bind(this.interceptor),
      this.controller.fileHandler.bind(this.controller)
    );
  }
}
