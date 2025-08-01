import { format } from "date-fns";
import fc from "fast-check";
import { describe, expect, it, vi } from "vitest";
import { YEAR_MONTH_DAY_FORMAT, YearMonthDay } from "./YearMonthDay.js";
describe('YearMonthDay', ()=>{
    it('should return YearMonthDay when input is valid', ()=>{
        fc.assert(fc.property(fc.date({
            min: new Date(0),
            max: new Date(9999, 11, 31)
        }).map((date)=>{
            const year = date.getFullYear().toString().padStart(4, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return {
                year,
                month,
                day,
                date: `${year}-${month}-${day}`
            };
        }), ({ year, month, day, date })=>{
            const value = YearMonthDay.from(date);
            expect(value).toBeInstanceOf(YearMonthDay);
            expect(value.yearString).toEqual(year);
            expect(value.monthString).toEqual(month);
            expect(value.dayString).toEqual(day);
            expect(value.year).toBe(Number(year));
            expect(value.month).toBe(Number(month));
            expect(value.day).toBe(Number(day));
            expect(value.toString()).toEqual(date);
        }));
    });
    it('should throw invalid year exception when input invalid year', ()=>{
        fc.assert(fc.property(fc.string({
            minLength: 1,
            maxLength: 3
        }), (year)=>{
            expect(()=>YearMonthDay.from(`${year}-01-01`)).toThrow(/Invalid Year/);
        }));
    });
    it('should throw invalid month exception when input invalid month', ()=>{
        fc.assert(fc.property(fc.integer({
            min: 13,
            max: 23
        }).map((v)=>v.toString()), (month)=>{
            expect(()=>YearMonthDay.from(`2024-${month}-01`)).toThrow(/Invalid Month/);
        }));
    });
    it('should throw invalid day exception when input invalid day', ()=>{
        fc.assert(fc.property(fc.integer({
            min: 32,
            max: 99
        }), (day)=>{
            expect(()=>YearMonthDay.from(`2024-11-${day}`)).toThrow(/Invalid Day/);
        }));
    });
    it('should return YearMonthDay when input is 02/29 in leap year', ()=>{
        fc.assert(fc.property(fc.integer({
            min: 0,
            max: 9999
        }).map((year)=>year.toString().padStart(4, '0')), (year)=>{
            //is leap year
            fc.pre(Number(year) % 4 === 0 && Number(year) % 100 !== 0 || Number(year) % 400 === 0);
            const day = '29';
            const month = '02';
            const date = `${year}-${month}-${day}`;
            const value = YearMonthDay.from(date);
            expect(value).toBeInstanceOf(YearMonthDay);
            expect(value.yearString).toEqual(year);
            expect(value.monthString).toEqual(month);
            expect(value.dayString).toEqual(day);
            expect(value.year).toBe(Number(year));
            expect(value.month).toBe(Number(month));
            expect(value.day).toBe(Number(day));
            expect(value.toString()).toEqual(date);
        }));
    });
    it('should throw invalid day exception when input is 02/29 in non-leap year', ()=>{
        fc.assert(fc.property(fc.integer({
            min: 0,
            max: 9999
        }).map((year)=>year.toString().padStart(4, '0')), (year)=>{
            fc.pre(!(Number(year) % 4 === 0 && Number(year) % 100 !== 0 || Number(year) % 400 === 0));
            const day = '29';
            const month = '02';
            const date = `${year}-${month}-${day}`;
            expect(()=>YearMonthDay.from(date)).toThrow(/Invalid Day/);
        }));
    });
    describe('toDate', ()=>{
        it('should return Date when call toDate', ()=>{
            fc.assert(fc.property(fc.date({
                min: new Date(0),
                max: new Date(9999, 11, 31)
            }).map((date)=>{
                const year = date.getFullYear().toString().padStart(4, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                return `${year}-${month}-${day}`;
            }), (date)=>{
                const value = YearMonthDay.from(date);
                expect(value).toBeInstanceOf(YearMonthDay);
                expect(value.toString()).toEqual(date);
                expect(value.toDate()).toEqual(new Date(date));
            }));
        });
    });
    describe('current', ()=>{
        it('should return current YearMonthDay when call current', ()=>{
            fc.assert(fc.property(fc.date({
                min: new Date(0),
                max: new Date(9999, 11, 31)
            }), (mockDate)=>{
                vi.setSystemTime(mockDate);
                const value = YearMonthDay.current();
                expect(value.toString()).toEqual(format(mockDate, YEAR_MONTH_DAY_FORMAT));
                vi.useRealTimers();
            }));
        });
    });
});

//# sourceMappingURL=YearMonthDay.spec.js.map