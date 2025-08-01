import { BaseProjectReport, BaseUpdateProjectReport } from "./BaseProjectReport.js";
export class ProjectBudgetChange extends BaseProjectReport {
    update(args) {
        return new UpdateProjectBudgetChange({
            id: this.id,
            ...args
        });
    }
    constructor(args){
        super(args);
        this.title = args.title;
        this.reportText = args.reportText;
        this.changeReasonCode = args.changeReasonCode;
        this.billingClientId = args.billingClientId;
    }
}
export class UpdateProjectBudgetChange extends BaseUpdateProjectReport {
    constructor(args){
        super(args);
        this.title = args.title;
        this.reportText = args.reportText;
        this.changeReasonCode = args.changeReasonCode;
        this.billingClientId = args.billingClientId;
    }
}

//# sourceMappingURL=ProjectBudgetChange.js.map