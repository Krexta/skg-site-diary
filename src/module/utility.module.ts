import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfig, CustomLogger } from 'src/utility';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
  ],
  providers: [CustomLogger, AppConfig],
  exports: [CustomLogger, AppConfig],
})
export class UtilityModule {}
