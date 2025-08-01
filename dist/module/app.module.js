function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
import { Module } from "@nestjs/common";
import { AppScenario } from "../application/scenario/app.scenario.js";
import { AppController } from "../presentation/app.controller.js";
import { TrackerMiddleware } from "../presentation/middleware/tracker.middleware.js";
import { ReportModule } from "./report.module.js";
import { UtilityModule } from "./utility.module.js";
export class AppModule {
    configure(consumer) {
        consumer.apply(TrackerMiddleware).forRoutes('*');
    }
}
AppModule = _ts_decorate([
    Module({
        imports: [
            UtilityModule,
            ReportModule
        ],
        controllers: [
            AppController
        ],
        providers: [
            AppScenario
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map