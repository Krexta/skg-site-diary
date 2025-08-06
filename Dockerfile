# 開発環境
FROM node:20 AS development

RUN apt-get update && apt-get install -y --no-install-recommends \
	git \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /server

RUN npm install -g npm
RUN npm install -g pnpm

RUN mkdir -p /root/.local/share/pnpm \
	&& pnpm config set global-bin-dir /root/.local/share/pnpm \
	&& pnpm config set global-dir /root/.local/share/pnpm

ENV PATH="/root/.local/share/pnpm:${PATH}"

RUN pnpm add -g @nestjs/cli

COPY . .

CMD ["/bin/sh", "-c", "pnpm install && pnpm db:generate && pnpm db:deploy && pnpm run start:dev"]

# ビルド環境
FROM node:20 AS build

WORKDIR /build

RUN apt-get update && apt-get install -y --no-install-recommends \
	&& rm -rf /var/lib/apt/lists/*

RUN npm install -g npm
RUN npm install -g pnpm

RUN mkdir -p /root/.local/share/pnpm \
	&& pnpm config set global-bin-dir /root/.local/share/pnpm \
	&& pnpm config set global-dir /root/.local/share/pnpm

ENV PATH="/root/.local/share/pnpm:${PATH}"

RUN pnpm add -g @nestjs/cli

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

ENV NODE_ENV production

COPY . .

RUN pnpm run build
RUN pnpm prune --prod

# 本番環境
FROM node:20-alpine

WORKDIR /server

ENV NODE_ENV production

COPY --from=build /build/dist /server/dist
COPY --from=build /build/node_modules /server/node_modules
COPY --from=build /build/package.json /server/package.json

CMD [ "node", "dist/main.js" ]
