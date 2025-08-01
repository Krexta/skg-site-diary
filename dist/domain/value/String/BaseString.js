import { BaseValueObject } from "../Base.js";
export const MAX_REPORT_TYPE_CODE_LENGTH = 20;
export const MAX_FILE_NAME_LENGTH = 255;
export class NonEmptyString extends BaseValueObject {
    validate(value) {
        if (value !== null) {
            const trimmed = value.trim();
            if (trimmed.length === 0) {
                throw new Error(`${this.constructor.name} must be not empty`);
            }
        }
        return value;
    }
}

//# sourceMappingURL=BaseString.js.map