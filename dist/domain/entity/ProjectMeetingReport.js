import { BaseProjectReport, BaseUpdateProjectReport } from "./BaseProjectReport.js";
export class ProjectMeetingReport extends BaseProjectReport {
    update(args) {
        return new UpdateProjectMeetingReport({
            id: this.id,
            ...args
        });
    }
    constructor(args){
        super(args);
        this.title = args.title;
        this.reportText = args.reportText;
    }
}
export class UpdateProjectMeetingReport extends BaseUpdateProjectReport {
    constructor(args){
        super(args);
        this.title = args.title;
        this.reportText = args.reportText;
    }
}

//# sourceMappingURL=ProjectMeetingReport.js.map