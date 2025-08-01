import { BaseProjectReport, BaseUpdateProjectReport } from "./BaseProjectReport.js";
export class ProjectCloseReport extends BaseProjectReport {
    update(args) {
        return new UpdateProjectCloseReport({
            id: this.id,
            ...args
        });
    }
    constructor(args){
        super(args);
        this.title = args.title;
        this.reportText = args.reportText;
        this.closeReportChecklist = args.closeReportChecklist;
    }
}
export class UpdateProjectCloseReport extends BaseUpdateProjectReport {
    constructor(args){
        super(args);
        this.title = args.title;
        this.reportText = args.reportText;
        this.closeReportChecklist = args.closeReportChecklist;
    }
}

//# sourceMappingURL=ProjectCloseReport.js.map