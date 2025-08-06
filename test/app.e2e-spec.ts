import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { beforeEach, describe, it } from 'vitest';

import { AppModule } from 'src/module/app.module';
import { CustomLogger } from 'src/utility';

import { TestLogger } from './utility/logger';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CustomLogger)
      .useClass(TestLogger)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
