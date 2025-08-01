import { BaseValueObject } from "../Base.js";
export const PROJECT_STATUS_CODE_LIST = [
    'NOT_STARTED',
    'DESIGN_IN_PROGRESS',
    'START_AT_NEXT_MONTH',
    'IN_PROGRESS_AT_SITE',
    'CONSTRUCTION_COMPLETE',
    'MONTHLY_REPORT_COMPLETE',
    'PAYMENT_RECEIVED',
    'ABORTED',
    'DELETED'
];
export class ProjectStatusCode extends BaseValueObject {
    static from(value) {
        return new ProjectStatusCode(value);
    }
    validate(value) {
        if (!PROJECT_STATUS_CODE_LIST.includes(value)) {
            throw new Error('Invalid project status code');
        }
        return value;
    }
}

//# sourceMappingURL=ProjectStatusCode.js.map