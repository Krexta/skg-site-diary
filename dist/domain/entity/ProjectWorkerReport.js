import { BaseProjectReport, BaseUpdateProjectReport } from "./BaseProjectReport.js";
export class ProjectWorkerReport extends BaseProjectReport {
    update(args) {
        return new UpdateProjectWorkerReport({
            id: this.id,
            ...args
        });
    }
    constructor(args){
        super(args);
        this.title = args.title;
        this.reportText = args.reportText;
        this.reportTypeCode = args.reportTypeCode;
        this.workerIds = args.workerIds;
    }
}
export class UpdateProjectWorkerReport extends BaseUpdateProjectReport {
    constructor(args){
        super(args);
        this.title = args.title;
        this.reportText = args.reportText;
        this.reportTypeCode = args.reportTypeCode;
        this.workerIds = args.workerIds;
    }
}

//# sourceMappingURL=ProjectWorkerReport.js.map