import { BaseProjectReport, BaseUpdateProjectReport } from "./BaseProjectReport.js";
export class ProjectCommonReport extends BaseProjectReport {
    update(args) {
        return new UpdateProjectCommonReport({
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
export class UpdateProjectCommonReport extends BaseUpdateProjectReport {
    constructor(args){
        super(args);
        this.title = args.title;
        this.reportText = args.reportText;
    }
}

//# sourceMappingURL=ProjectCommonReport.js.map