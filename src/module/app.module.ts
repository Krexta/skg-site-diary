import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppScenario } from 'src/application/scenario/app.scenario';
import { AppController } from 'src/presentation/app.controller';
import { TrackerMiddleware } from 'src/presentation/middleware/tracker.middleware';

import { UtilityModule } from './utility.module';

@Module({
  imports: [UtilityModule],
  controllers: [AppController],
  providers: [AppScenario],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TrackerMiddleware).forRoutes('*');
  }
}
