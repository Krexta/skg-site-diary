import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class TrackerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl, body } = req;
    const start = Date.now();

    this.logger.log(
      `[Request] ${ip} ${method} ${originalUrl} ${JSON.stringify(body)}`,
    );

    const oldJson = res.json;
    res.json = (body) => {
      res.locals.body = JSON.stringify(body);
      return oldJson.call(res, body);
    };

    res.on('finish', () => {
      const {
        statusCode,
        locals: { body },
      } = res;
      const elapsed = Date.now() - start;

      this.logger.log(
        `[Response] ${ip} ${method} ${originalUrl} ${statusCode} ${body ?? ''} ${elapsed}ms`,
      );
    });

    next();
  }
}
