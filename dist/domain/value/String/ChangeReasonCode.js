import { BaseValueObject } from "../Base.js";
export const CHANGE_REASON_CODE_LIST = [
    'BUDGET_ERROR',
    'WORKING_MISTAKE',
    'CONSTRUCTION_CHANGE',
    'CONSTRUCTOR_MISTAKE',
    'PROCEDURE_MISTAKE',
    'TIME_LIMIT'
];
export class ChangeReasonCode extends BaseValueObject {
    static from(value) {
        return new ChangeReasonCode(value);
    }
    validate(value) {
        if (!CHANGE_REASON_CODE_LIST.includes(value)) {
            throw new Error('Invalid change reason code');
        }
        return value;
    }
}

//# sourceMappingURL=ChangeReasonCode.js.map