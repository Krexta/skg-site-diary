import { BaseProjectReport, BaseUpdateProjectReport } from "./BaseProjectReport.js";
export class ProgressCheckReport extends BaseProjectReport {
    update(args) {
        return new UpdateProgressCheckReport({
            id: this.id,
            ...args
        });
    }
    constructor(args){
        super(args);
        this.title = args.title;
        this.reportText = args.reportText;
        this.executionBudgetUnitId = args.executionBudgetUnitId;
        this.progressReportData = args.progressReportData;
        this.totalPerformancePercentage = args.totalPerformancePercentage;
        this.consumedWorkersPercentage = args.consumedWorkersPercentage;
        this.workerIds = args.workerIds;
    }
}
export class UpdateProgressCheckReport extends BaseUpdateProjectReport {
    constructor(args){
        super(args);
        this.title = args.title;
        this.reportText = args.reportText;
        this.executionBudgetUnitId = args.executionBudgetUnitId;
        this.progressReportData = args.progressReportData;
        this.totalPerformancePercentage = args.totalPerformancePercentage;
        this.consumedWorkersPercentage = args.consumedWorkersPercentage;
        this.workerIds = args.workerIds;
    }
}

//# sourceMappingURL=ProgressCheckReport.js.map