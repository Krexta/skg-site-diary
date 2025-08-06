# skg-site-diary

## Description

SKG案件管理システム：現場記録

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## 主なフォルダ構成

```
.
├── doc
│   ├── dbml
│   ├── graphql
│   └── openapi
├── prisma
├── src
│   ├── application
│   │   ├── scenario
│   │   └── service
│   ├── domain
│   │   ├── entity
│   │   ├── repository
│   │   └── value
│   ├── infrastructure
│   │   ├── persistence
│   │   └── service
│   ├── module
│   ├── presentation
│   │   └── middleware
│   └── utility
├── test
└── tools
```


### doc
- 自動生成したドキュメントを格納するフォルダです。

### doc/dbml
- DBML形式のデータベース設計書を格納するフォルダです。

### doc/graphql
- GraphQLのスキーマ定義書を格納するフォルダです。

### doc/openapi
- OpenAPI形式のAPI仕様書を格納するフォルダです。

### prisma
- Prismaの設定ファイルを格納するフォルダです。

### src
- NestJSのソースコードを格納するフォルダです。

### src/application
- アプリケーション層のソースコードを格納するフォルダです。

### src/application/scenario
- アプリケーション層のシナリオを格納するフォルダです。
- プレゼンテーション層から呼び出され、ユースケースを実現します。

### src/application/service
- アプリケーション層のサービスを格納するフォルダです。
- 複数のユースケースから呼び出される共通の処理を実装します。

### src/domain
- ドメイン層のソースコードを格納するフォルダです。

### src/entity
- ドメイン層のエンティティを格納するフォルダです。

### src/value
- ドメイン層の値オブジェクトを格納するフォルダです。

### src/repository
- ドメイン層のリポジトリを格納するフォルダです。
- インフラ層のインターフェイス定義ですが、`Abstract Class`で実装します。

### src/infrastructure
- インフラ層のソースコードを格納するフォルダです。

### src/infrastructure/persistence
- 永続化層のソースコードを格納するフォルダです。
- データベースアクセスを実装します。

### src/infrastructure/service
- インフラ層のサービスを格納するフォルダです。

### src/module
- NestJSのモジュールを格納するフォルダです。

### src/presentation
- プレゼンテーション層のソースコードを格納するフォルダです。

### src/presentation/middleware
- ミドルウェアを格納するフォルダです。

### src/utility
- 複数の層をまたぐ便利クラスや関数を格納するフォルダです。
  
### test
- E2Eテストコードを格納するフォルダです。

### tools
- 実装するサーバーとは直接関係のない、開発に必要なツールを格納するフォルダです。
