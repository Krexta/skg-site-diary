import { BaseValueObject } from "../Base.js";
export class ProgressReportData extends BaseValueObject {
    static from(value) {
        return new ProgressReportData(value);
    }
    validate(value) {
        return value;
    }
}

//# sourceMappingURL=ProgressReportData.js.map