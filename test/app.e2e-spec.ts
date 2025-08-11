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

  describe('/diaryql (POST)', () => {
    it.todo('認証が無い場合はエラーを返す');
    it('GraphQLのエンドポイントにアクセスできる', () => {
      // TODO: 認証の実装が必要なため、認証実装後、テスト内容を修正する。
      return request(app.getHttpServer())
        .post('/diaryql')
        .send({
          query: `query {
            nodeId
          }`,
        })
        .expect(200)
        .expect({
          data: {
            nodeId: 'query',
          },
        });
    });
  });
});
