export class BaseProjectReport {
    constructor(args){
        this.id = args.id;
        this.createUserId = args.createUserId;
        this.reportDate = args.reportDate;
        this.projectId = args.projectId;
        this.files = args.files;
    }
}
export class BaseUpdateProjectReport {
    constructor(args){
        this.id = args.id;
        this.createUserId = args.createUserId;
        this.reportDate = args.reportDate;
        this.files = args.files;
    }
}

//# sourceMappingURL=BaseProjectReport.js.map