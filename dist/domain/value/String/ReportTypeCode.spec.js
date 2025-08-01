import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { MAX_REPORT_TYPE_CODE_LENGTH } from "./BaseString.js";
import { ReportTypeCode } from "./ReportTypeCode.js";
describe('ReportTypeCode', ()=>{
    it('should return ReportTypeCode when input is valid', ()=>{
        fc.assert(fc.property(fc.option(fc.string({
            minLength: 1,
            maxLength: MAX_REPORT_TYPE_CODE_LENGTH
        }).map((val)=>val.trim()).filter((val)=>val.length >= 1)), (code)=>{
            const value = ReportTypeCode.from(code);
            expect(value).toBeInstanceOf(ReportTypeCode);
            expect(value.value).toEqual(code);
        }));
    });
    it('should throw an error when input is empty', ()=>{
        fc.assert(fc.property(fc.constantFrom('', ' ', '  '), (code)=>{
            expect(()=>ReportTypeCode.from(code)).toThrow('ReportTypeCode must be not empty');
        }));
    });
    it('should throw an error when input is too long', ()=>{
        fc.assert(fc.property(fc.string({
            minLength: MAX_REPORT_TYPE_CODE_LENGTH + 1
        }).map((val)=>val.trim()).filter((val)=>val.length > MAX_REPORT_TYPE_CODE_LENGTH), (code)=>{
            expect(()=>ReportTypeCode.from(code)).toThrow(`ReportTypeCode has maximum length of ${MAX_REPORT_TYPE_CODE_LENGTH}`);
        }));
    });
    describe('equals', ()=>{
        it('should return true when compare two ReportTypeCode has same value', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 1,
                maxLength: MAX_REPORT_TYPE_CODE_LENGTH
            }).map((val)=>val.trim()).filter((val)=>val.length >= 1), (code)=>{
                const value1 = ReportTypeCode.from(code);
                const value2 = ReportTypeCode.from(code);
                expect(value1).toBeInstanceOf(ReportTypeCode);
                expect(value2).toBeInstanceOf(ReportTypeCode);
                expect(value1.value).toEqual(code);
                expect(value2.value).toEqual(code);
                expect(value1.equals(value2)).toBe(true);
            }));
        });
        it('should return true when compare two ReportTypeCode has difference value', ()=>{
            fc.assert(fc.property(fc.record({
                code1: fc.string({
                    minLength: 1,
                    maxLength: MAX_REPORT_TYPE_CODE_LENGTH
                }).map((val)=>val.trim()).filter((val)=>val.length >= 1),
                code2: fc.string({
                    minLength: 1,
                    maxLength: MAX_REPORT_TYPE_CODE_LENGTH
                }).map((val)=>val.trim()).filter((val)=>val.length >= 1)
            }).filter(({ code1, code2 })=>code1 !== code2), ({ code1, code2 })=>{
                const value1 = ReportTypeCode.from(code1);
                const value2 = ReportTypeCode.from(code2);
                expect(value1).toBeInstanceOf(ReportTypeCode);
                expect(value2).toBeInstanceOf(ReportTypeCode);
                expect(value1.value).toEqual(code1);
                expect(value2.value).toEqual(code2);
                expect(value1.equals(value2)).toBe(false);
            }));
        });
    });
});

//# sourceMappingURL=ReportTypeCode.spec.js.map