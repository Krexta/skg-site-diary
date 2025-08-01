import { BaseValueObject } from "../Base.js";
export const CONSUMED_WORKERS_PERCENTAGE_PRECISION = 3;
export const CONSUMED_WORKERS_PERCENTAGE_SCALE = 2;
export const TOTAL_PERFORMANCE_PERCENTAGE_PRECISION = 3;
export const TOTAL_PERFORMANCE_PERCENTAGE_SCALE = 1;
let Decimal = class Decimal extends BaseValueObject {
    isValidDecimal(stringValue, maxDigits, maxDecimals) {
        // Reject scientific notation (e.g., 2222e10)
        if (stringValue.includes('e') || stringValue.includes('E')) {
            return false;
        }
        // Dynamic regex for DECIMAL(X,Y)
        const decimalRegex = new RegExp(`^-?[0-9]{1,${maxDigits - maxDecimals}}(\\.[0-9]{1,${maxDecimals}})?$`);
        if (!decimalRegex.test(stringValue)) {
            return false;
        }
        // Check range constraints (optional)
        const maxValue = Math.pow(10, maxDigits) - Math.pow(10, -maxDecimals);
        const minValue = -Math.pow(10, maxDigits) + Math.pow(10, -maxDecimals);
        return Number(stringValue) >= minValue && Number(stringValue) <= maxValue;
    }
    validate(val) {
        const { value, precision, scale } = val;
        if (value !== null) {
            if (Number.isNaN(Number(val.value))) {
                throw new Error(`${this.constructor.name} must be number`);
            }
            if (!this.isValidDecimal(value, precision, scale)) {
                throw new Error(`${this.constructor.name} must be Decimal(${precision},${scale})`);
            }
        }
        return val;
    }
    equals(other) {
        return this === other || this._value.value === other._value.value && this._value.precision === this._value.precision && this._value.scale === this._value.scale;
    }
    toValue() {
        return this._value.value;
    }
};
export class PositiveDecimal extends Decimal {
    validate(val) {
        val = super.validate(val);
        if (val.value !== null && Number(val.value) < 0) {
            throw new Error(`${this.constructor.name} must be positive`);
        }
        return val;
    }
}

//# sourceMappingURL=BaseNumber.js.map