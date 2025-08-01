import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { CHANGE_REASON_CODE_LIST, ChangeReasonCode } from "./ChangeReasonCode.js";
describe('ChangeReasonCode', ()=>{
    it('should return ChangeReasonCode when input is valid', ()=>{
        fc.assert(fc.property(fc.constantFrom(...CHANGE_REASON_CODE_LIST), (code)=>{
            const value = ChangeReasonCode.from(code);
            expect(value).toBeInstanceOf(ChangeReasonCode);
            expect(value.value).toEqual(code);
        }));
    });
    it('should throw an error when input is invalid', ()=>{
        fc.assert(fc.property(fc.string().filter((val)=>!CHANGE_REASON_CODE_LIST.includes(val)), (code)=>{
            expect(()=>ChangeReasonCode.from(code)).toThrow('Invalid change reason code');
        }));
    });
    describe('equals', ()=>{
        it('should return true when compare two ChangeReasonCode has same value', ()=>{
            fc.assert(fc.property(fc.constantFrom(...CHANGE_REASON_CODE_LIST), (code)=>{
                const value1 = ChangeReasonCode.from(code);
                const value2 = ChangeReasonCode.from(code);
                expect(value1).toBeInstanceOf(ChangeReasonCode);
                expect(value2).toBeInstanceOf(ChangeReasonCode);
                expect(value1.value).toEqual(code);
                expect(value2.value).toEqual(code);
                expect(value1.equals(value2)).toBe(true);
            }));
        });
        it('should return true when compare two ChangeReasonCode has difference value', ()=>{
            fc.assert(fc.property(fc.record({
                code1: fc.constantFrom(...CHANGE_REASON_CODE_LIST),
                code2: fc.constantFrom(...CHANGE_REASON_CODE_LIST)
            }).filter(({ code1, code2 })=>code1 !== code2), ({ code1, code2 })=>{
                const value1 = ChangeReasonCode.from(code1);
                const value2 = ChangeReasonCode.from(code2);
                expect(value1).toBeInstanceOf(ChangeReasonCode);
                expect(value2).toBeInstanceOf(ChangeReasonCode);
                expect(value1.value).toEqual(code1);
                expect(value2.value).toEqual(code2);
                expect(value1.equals(value2)).toBe(false);
            }));
        });
    });
});

//# sourceMappingURL=ChangeReasonCode.spec.js.map