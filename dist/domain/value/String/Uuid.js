import * as uuid from "uuid";
import { BaseValueObject } from "../Base.js";
let UuidV7 = class UuidV7 extends BaseValueObject {
    validate(value) {
        if (uuid.validate(value) === false || uuid.version(value) !== 7) {
            throw new Error('Invalid UUID v7: ' + value);
        }
        return value;
    }
};
export class ProjectReportId extends UuidV7 {
    static from(value) {
        return new ProjectReportId(value);
    }
    static make() {
        return new ProjectReportId(uuid.v7());
    }
}
export class CreateUserId extends UuidV7 {
    static from(value) {
        return new CreateUserId(value);
    }
    static make() {
        return new CreateUserId(uuid.v7());
    }
}
export class ProjectId extends UuidV7 {
    static from(value) {
        return new ProjectId(value);
    }
}
export class FileId extends UuidV7 {
    static from(value) {
        return new FileId(value);
    }
    static make() {
        return new FileId(uuid.v7());
    }
}
export class UploadUserId extends UuidV7 {
    static from(value) {
        return new UploadUserId(value);
    }
    static make() {
        return new UploadUserId(uuid.v7());
    }
}
export class ProgressCheckReportId extends UuidV7 {
    static from(value) {
        return new ProgressCheckReportId(value);
    }
    static make() {
        return new ProgressCheckReportId(uuid.v7());
    }
}
export class ExecutionBudgetUnitId extends UuidV7 {
    static from(value) {
        return new ExecutionBudgetUnitId(value);
    }
    static make() {
        return new ExecutionBudgetUnitId(uuid.v7());
    }
}
export class ProjectBudgetChangeId extends UuidV7 {
    static from(value) {
        return new ProjectBudgetChangeId(value);
    }
    static make() {
        return new ProjectBudgetChangeId(uuid.v7());
    }
}
export class BillingClientId extends UuidV7 {
    static from(value) {
        return new BillingClientId(value);
    }
    static make() {
        return new BillingClientId(uuid.v7());
    }
}
export class ProjectCloseReportId extends UuidV7 {
    static from(value) {
        return new ProjectCloseReportId(value);
    }
    static make() {
        return new ProjectCloseReportId(uuid.v7());
    }
}
export class ProjectCommonReportId extends UuidV7 {
    static from(value) {
        return new ProjectCommonReportId(value);
    }
    static make() {
        return new ProjectCommonReportId(uuid.v7());
    }
}
export class ProjectMeetingReportId extends UuidV7 {
    static from(value) {
        return new ProjectMeetingReportId(value);
    }
    static make() {
        return new ProjectMeetingReportId(uuid.v7());
    }
}
export class ProjectStatusUpdateReportId extends UuidV7 {
    static from(value) {
        return new ProjectStatusUpdateReportId(value);
    }
    static make() {
        return new ProjectStatusUpdateReportId(uuid.v7());
    }
}
export class ProjectWorkerReportId extends UuidV7 {
    static from(value) {
        return new ProjectWorkerReportId(value);
    }
    static make() {
        return new ProjectWorkerReportId(uuid.v7());
    }
}
export class WorkerId extends UuidV7 {
    static from(value) {
        return new WorkerId(value);
    }
    static make() {
        return new WorkerId(uuid.v7());
    }
}
export class ProgressCheckReportedWorkerId extends UuidV7 {
    static from(value) {
        return new ProgressCheckReportedWorkerId(value);
    }
    static make() {
        return new ProgressCheckReportedWorkerId(uuid.v7());
    }
}
export class ReportedWorkerId extends UuidV7 {
    static from(value) {
        return new ReportedWorkerId(value);
    }
    static make() {
        return new ReportedWorkerId(uuid.v7());
    }
}

//# sourceMappingURL=Uuid.js.map