import { BaseProjectReport, BaseUpdateProjectReport } from "./BaseProjectReport.js";
export class ProjectStatusUpdateReport extends BaseProjectReport {
    update(args) {
        return new UpdateProjectStatusUpdateReport({
            id: this.id,
            ...args
        });
    }
    constructor(args){
        super(args);
        this.title = args.title;
        this.reportText = args.reportText;
        this.projectStatusCode = args.projectStatusCode;
    }
}
export class UpdateProjectStatusUpdateReport extends BaseUpdateProjectReport {
    constructor(args){
        super(args);
        this.title = args.title;
        this.reportText = args.reportText;
        this.projectStatusCode = args.projectStatusCode;
    }
}

//# sourceMappingURL=ProjectStatusUpdateReport.js.map