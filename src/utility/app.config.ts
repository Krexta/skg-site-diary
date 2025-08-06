import assert from 'assert';

import { Injectable, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CustomLogger } from 'src/utility';

@Injectable()
export class AppConfig {
  private static env = process.env.NODE_ENV;

  static LoggingLogLevel(): LogLevel[] {
    const env = AppConfig.env;

    switch (env) {
      case 'test':
        return ['error', 'warn', 'debug'];
      case 'local':
        return ['log', 'error', 'warn', 'debug', 'verbose', 'fatal'];
      case 'dev':
      case 'development':
        return ['log', 'error', 'warn', 'fatal'];
      case 'production':
        return ['log', 'error', 'fatal'];
    }

    return ['log', 'error', 'warn', 'debug', 'verbose', 'fatal'];
  }
  static switchGraphileConfig<T, U>(development: T, production: U): T | U {
    const env = AppConfig.env;
    switch (env) {
      case 'local':
        return development;
      case 'dev':
      case 'development':
        return production;
      case 'production':
        return production;
    }

    return development;
  }

  static get DatabaseUrl(): string {
    const env = process.env.DATABASE_URL;
    if (!env) {
      assert('DATABASE_URL not found!!');
    }

    return env ?? '';
  }

  static get isLocal(): boolean {
    return AppConfig.env === 'local';
  }

  readonly logger = new CustomLogger('AppConfigService');
  private readonly node_env: string;

  constructor(private readonly configService: ConfigService) {
    const env = this.configService.getOrThrow<string>('NODE_ENV');
    this.logger.debug(`NODE_ENV: ${env}`);

    this.node_env = env;
  }

  get port(): string {
    return this.configService.getOrThrow<string>('PORT') ?? '3030';
  }

  private get isLocal(): boolean {
    return this.node_env === 'local';
  }
  private get isDevelopment(): boolean {
    return ['development', 'dev'].includes(this.node_env);
  }
  get isValidationDisableErrorMessage(): boolean {
    return !(this.isLocal || this.isDevelopment);
  }

  switchSwaggerSetup(func: () => any) {
    if (this.isLocal === true) {
      return func();
    }
  }
}
