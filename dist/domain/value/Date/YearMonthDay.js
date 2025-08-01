import { format } from "date-fns";
import { BaseValueObject } from "../Base.js";
export const YEAR_MONTH_DAY_FORMAT = 'yyyy-MM-dd';
export class YearMonthDay extends BaseValueObject {
    static from(date) {
        if (!/^[0-9]+-[0-9]{2}-[0-9]{2}$/.test(date)) {
            throw new Error(`Invalid YearMonthDay: ${date}`);
        }
        const [year, month, day] = date.split('-', 3);
        return new YearMonthDay([
            year,
            month,
            day
        ]);
    }
    static current() {
        return YearMonthDay.from(format(new Date(), YEAR_MONTH_DAY_FORMAT));
    }
    validate(value) {
        const [year, month, day] = value;
        if (!/^[0-9]{4}$/.test(year)) {
            throw new Error(`Invalid Year: ${year}`);
        }
        if (!/^(0[1-9]|1[0-2])$/.test(month)) {
            throw new Error(`Invalid Month: ${month}`);
        }
        if (!/^([0-2][0-9]|3[0-1])$/.test(day)) {
            throw new Error(`Invalid Day: ${day}`);
        }
        const yearInt = Number(year);
        const monthInt = Number(month);
        const dayInt = Number(day);
        const isLeapYear = yearInt % 4 === 0 && yearInt % 100 !== 0 || yearInt % 400 === 0;
        if (monthInt === 2) {
            if (!isLeapYear && dayInt > 28 || isLeapYear && dayInt > 29) {
                throw new Error(`Invalid Day: ${day}`);
            }
        }
        return value;
    }
    equals(other) {
        return this._value.toString() === other._value.toString();
    }
    get year() {
        return Number(this.value[0]);
    }
    get month() {
        return Number(this.value[1]);
    }
    get day() {
        return Number(this.value[2]);
    }
    get yearString() {
        return this.value[0];
    }
    get monthString() {
        return this.value[1];
    }
    get dayString() {
        return this.value[2];
    }
    toString() {
        return `${this.yearString}-${this.monthString}-${this.dayString}`;
    }
    toDate() {
        return new Date(this.toString());
    }
}

//# sourceMappingURL=YearMonthDay.js.map