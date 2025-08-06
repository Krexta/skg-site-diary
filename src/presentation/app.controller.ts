// cSpell:ignore graphiql
import { Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import { PostGraphileResponseNode } from 'postgraphile';

import { AppScenario } from '../application/scenario/app.scenario';

import { middleware } from './middleware/postgraphile.middleware';

import type { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppScenario) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(middleware.graphiqlRoute)
  graphiql(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: (e?: 'route' | Error) => void,
  ) {
    middleware.graphiqlRouteHandler?.(
      new PostGraphileResponseNode(request, response, next),
    );
  }

  @Post(middleware.graphqlRoute)
  graphql(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: (e?: 'route' | Error) => void,
  ) {
    middleware.graphqlRouteHandler(
      new PostGraphileResponseNode(request, response, next),
    );
  }
}
