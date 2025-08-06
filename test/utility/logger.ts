import { ConsoleLogger } from '@nestjs/common';

// エラーログが出ないようにするため、ConsoleLoggerを継承してログを無効化する
export class TestLogger extends ConsoleLogger {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  log(message: any, ...optionalParams: any[]) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(message: any, ...optionalParams: any[]) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn(message: any, ...optionalParams: any[]) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  debug(message: any, ...optionalParams: any[]) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  verbose(message: any, ...optionalParams: any[]) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fatal(message: any, ...optionalParams: any[]) {}
}
