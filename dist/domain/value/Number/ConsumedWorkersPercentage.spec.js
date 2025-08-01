import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { ConsumedWorkersPercentage } from "./ConsumedWorkersPercentage.js";
describe('ConsumedWorkersPercentage', ()=>{
    it('should return ConsumedWorkersPercentage when input is valid', ()=>{
        fc.assert(fc.property(fc.stringMatching(/^[0-9](\.[0-9]{1,2})?$/), (percentage)=>{
            const value = ConsumedWorkersPercentage.from(percentage);
            expect(value).toBeInstanceOf(ConsumedWorkersPercentage);
            expect(value.toValue()).toEqual(percentage);
        }));
    });
    it('should return ConsumedWorkersPercentage with 0.0 when call new', ()=>{
        const value = ConsumedWorkersPercentage.new();
        expect(value).toBeInstanceOf(ConsumedWorkersPercentage);
        expect(value.toValue()).toEqual('0.0');
    });
    it('should throw an error when input is not a number', ()=>{
        fc.assert(fc.property(fc.string().filter((val)=>Number.isNaN(Number(val))), (percentage)=>{
            expect(()=>ConsumedWorkersPercentage.from(percentage)).toThrow('ConsumedWorkersPercentage must be number');
        }));
    });
    it('should throw an error when input is negative ', ()=>{
        fc.assert(fc.property(fc.stringMatching(/^\-[1-9](\.[1-9]{1,2})?$/), (percentage)=>{
            expect(()=>ConsumedWorkersPercentage.from(percentage)).toThrow('ConsumedWorkersPercentage must be positive');
        }));
    });
    it('should throw an error when input not Decimal(3,2)', ()=>{
        fc.assert(fc.property(fc.oneof(fc.stringMatching(/^[0-9]{1,3}(\.[1-9]{3,})$/), fc.stringMatching(/^[1-9]{4,}(\.[1-9]{1,2})$/)), (percentage)=>{
            expect(()=>ConsumedWorkersPercentage.from(percentage)).toThrow('ConsumedWorkersPercentage must be Decimal(3,2)');
        }));
    });
    it('should throw an error when input contain e', ()=>{
        fc.assert(fc.property(fc.oneof(fc.stringMatching(/^[0-9]{1,2}(\.[1-9]{1,2}e[1-9])$/)), (percentage)=>{
            expect(()=>ConsumedWorkersPercentage.from(percentage)).toThrow('ConsumedWorkersPercentage must be Decimal(3,2)');
        }));
    });
    describe('equals', ()=>{
        it('should return true when compare two ConsumedWorkersPercentage has same value', ()=>{
            fc.assert(fc.property(fc.stringMatching(/^[0-9](\.[0-9]{1,2})?$/), (percentage)=>{
                const value1 = ConsumedWorkersPercentage.from(percentage);
                const value2 = ConsumedWorkersPercentage.from(percentage);
                expect(value1).toBeInstanceOf(ConsumedWorkersPercentage);
                expect(value2).toBeInstanceOf(ConsumedWorkersPercentage);
                expect(value1.toValue()).toEqual(percentage);
                expect(value2.toValue()).toEqual(percentage);
                expect(value1.equals(value2)).toBe(true);
            }));
        });
        it('should return true when compare two ConsumedWorkersPercentage has difference value', ()=>{
            fc.assert(fc.property(fc.record({
                percentage1: fc.stringMatching(/^[0-9](\.[0-9]{1,2})?$/),
                percentage2: fc.stringMatching(/^[0-9](\.[0-9]{1,2})?$/)
            }).filter(({ percentage1, percentage2 })=>percentage1 !== percentage2), ({ percentage1, percentage2 })=>{
                const value1 = ConsumedWorkersPercentage.from(percentage1);
                const value2 = ConsumedWorkersPercentage.from(percentage2);
                expect(value1).toBeInstanceOf(ConsumedWorkersPercentage);
                expect(value2).toBeInstanceOf(ConsumedWorkersPercentage);
                expect(value1.toValue()).toEqual(percentage1);
                expect(value2.toValue()).toEqual(percentage2);
                expect(value1.equals(value2)).toBe(false);
            }));
        });
    });
});

//# sourceMappingURL=ConsumedWorkersPercentage.spec.js.map