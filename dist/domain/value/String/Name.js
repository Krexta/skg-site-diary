import { MAX_FILE_NAME_LENGTH, NonEmptyString } from "./BaseString.js";
export class FileName extends NonEmptyString {
    static from(value) {
        return new FileName(value);
    }
    validate(value) {
        value = super.validate(value);
        if (value.length > MAX_FILE_NAME_LENGTH) {
            throw new Error(`FileName has maximum length of ${MAX_FILE_NAME_LENGTH}`);
        }
        return value;
    }
}

//# sourceMappingURL=Name.js.map