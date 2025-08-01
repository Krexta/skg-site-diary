import { MAX_REPORT_TYPE_CODE_LENGTH, NonEmptyString } from "./BaseString.js";
export class ReportTypeCode extends NonEmptyString {
    static from(value) {
        return new ReportTypeCode(value);
    }
    validate(value) {
        value = super.validate(value);
        if (value && value.length > MAX_REPORT_TYPE_CODE_LENGTH) {
            throw new Error(`ReportTypeCode has maximum length of ${MAX_REPORT_TYPE_CODE_LENGTH}`);
        }
        return value;
    }
}

//# sourceMappingURL=ReportTypeCode.js.map