import { NonEmptyString } from "./BaseString.js";
export class FilePath extends NonEmptyString {
    static from(value) {
        return new FilePath(value);
    }
}

//# sourceMappingURL=FilePath.js.map