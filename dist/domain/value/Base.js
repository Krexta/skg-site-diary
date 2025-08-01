const opaqueSymbol = Symbol('opaqueSymbol');
export class BaseValueObject {
    get value() {
        return this._value;
    }
    equals(other) {
        return this === other || this._value === other._value;
    }
    constructor(value){
        this._value = this.validate(value);
    }
}

//# sourceMappingURL=Base.js.map