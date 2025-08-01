import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { TotalPerformancePercentage } from "./TotalPerformancePercentage.js";
describe('TotalPerformancePercentage', ()=>{
    it('should return TotalPerformancePercentage when input is valid', ()=>{
        fc.assert(fc.property(fc.stringMatching(/^[0-9]{1,2}(\.[0-9])?$/), (percentage)=>{
            const value = TotalPerformancePercentage.from(percentage);
            expect(value).toBeInstanceOf(TotalPerformancePercentage);
            expect(value.toValue()).toEqual(percentage);
        }));
    });
    it('should return TotalPerformancePercentage with 0.0 when call new', ()=>{
        const value = TotalPerformancePercentage.new();
        expect(value).toBeInstanceOf(TotalPerformancePercentage);
        expect(value.toValue()).toEqual('0.0');
    });
    it('should throw an error when input is not a number', ()=>{
        fc.assert(fc.property(fc.string().filter((val)=>Number.isNaN(Number(val))), (percentage)=>{
            expect(()=>TotalPerformancePercentage.from(percentage)).toThrow('TotalPerformancePercentage must be number');
        }));
    });
    it('should throw an error when input is negative ', ()=>{
        fc.assert(fc.property(fc.stringMatching(/^\-[1-9]{1,2}(\.[1-9])?$/), (percentage)=>{
            expect(()=>TotalPerformancePercentage.from(percentage)).toThrow('TotalPerformancePercentage must be positive');
        }));
    });
    it('should throw an error when input not Decimal(3,1)', ()=>{
        fc.assert(fc.property(fc.oneof(fc.stringMatching(/^[0-9]{1,3}(\.[1-9]{2,})$/), fc.stringMatching(/^[1-9]{4,}(\.[1-9])$/)), (percentage)=>{
            expect(()=>TotalPerformancePercentage.from(percentage)).toThrow('TotalPerformancePercentage must be Decimal(3,1)');
        }));
    });
    it('should throw an error when input contain e', ()=>{
        fc.assert(fc.property(fc.oneof(fc.stringMatching(/^[0-9]{1,3}(\.[1-9]{3,}e[1-9])$/)), (percentage)=>{
            expect(()=>TotalPerformancePercentage.from(percentage)).toThrow('TotalPerformancePercentage must be Decimal(3,1)');
        }));
    });
    describe('equals', ()=>{
        it('should return true when compare two TotalPerformancePercentage has same value', ()=>{
            fc.assert(fc.property(fc.stringMatching(/^[0-9]{1,2}(\.[0-9])?$/), (percentage)=>{
                const value1 = TotalPerformancePercentage.from(percentage);
                const value2 = TotalPerformancePercentage.from(percentage);
                expect(value1).toBeInstanceOf(TotalPerformancePercentage);
                expect(value2).toBeInstanceOf(TotalPerformancePercentage);
                expect(value1.toValue()).toEqual(percentage);
                expect(value2.toValue()).toEqual(percentage);
                expect(value1.equals(value2)).toBe(true);
            }));
        });
        it('should return true when compare two TotalPerformancePercentage has difference value', ()=>{
            fc.assert(fc.property(fc.record({
                percentage1: fc.stringMatching(/^[0-9]{1,2}(\.[0-9])?$/),
                percentage2: fc.stringMatching(/^[0-9]{1,2}(\.[0-9])?$/)
            }).filter(({ percentage1, percentage2 })=>percentage1 !== percentage2), ({ percentage1, percentage2 })=>{
                const value1 = TotalPerformancePercentage.from(percentage1);
                const value2 = TotalPerformancePercentage.from(percentage2);
                expect(value1).toBeInstanceOf(TotalPerformancePercentage);
                expect(value2).toBeInstanceOf(TotalPerformancePercentage);
                expect(value1.toValue()).toEqual(percentage1);
                expect(value2.toValue()).toEqual(percentage2);
                expect(value1.equals(value2)).toBe(false);
            }));
        });
    });
});

//# sourceMappingURL=TotalPerformancePercentage.spec.js.map