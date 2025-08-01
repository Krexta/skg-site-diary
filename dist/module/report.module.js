function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
import { Module } from "@nestjs/common";
import { ProgressCheckReportScenario, ProjectBudgetChangeScenario, ProjectCloseReportScenario, ProjectCommonReportScenario, ProjectMeetingReportScenario, ProjectStatusUpdateReportScenario, ProjectWorkerReportScenario } from "../application/scenario/index.js";
import { ReportRepository } from "../domain/repository/index.js";
import { ReportTable } from "../infrastructure/persistence/project-report/index.js";
import { ReportCreateController, ReportUpdateController } from "../presentation/report/index.js";
import { PrismaModule } from "./prisma.module.js";
import { UtilityModule } from "./utility.module.js";
export class ReportModule {
}
ReportModule = _ts_decorate([
    Module({
        imports: [
            UtilityModule,
            PrismaModule
        ],
        controllers: [
            ReportCreateController,
            ReportUpdateController
        ],
        providers: [
            ProgressCheckReportScenario,
            ProjectBudgetChangeScenario,
            ProjectCloseReportScenario,
            ProjectCommonReportScenario,
            ProjectMeetingReportScenario,
            ProjectStatusUpdateReportScenario,
            ProjectWorkerReportScenario,
            {
                provide: ReportRepository,
                useClass: ReportTable
            }
        ],
        exports: []
    })
], ReportModule);

//# sourceMappingURL=report.module.js.map