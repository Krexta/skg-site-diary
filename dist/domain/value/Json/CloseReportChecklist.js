import { BaseValueObject } from "../Base.js";
export class CloseReportChecklist extends BaseValueObject {
    static from(value) {
        return new CloseReportChecklist(value);
    }
    validate(value) {
        return value;
    }
}

//# sourceMappingURL=CloseReportChecklist.js.map