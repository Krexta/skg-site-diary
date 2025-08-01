import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { ReportText } from "./ReportText.js";
describe('ReportText', ()=>{
    it('should return ReportText when input is valid', ()=>{
        fc.assert(fc.property(fc.option(fc.string({
            minLength: 1
        }).map((val)=>val.trim()).filter((val)=>val.length >= 1)), (reportText)=>{
            const value = ReportText.from(reportText);
            expect(value).toBeInstanceOf(ReportText);
            expect(value.value).toEqual(reportText);
        }));
    });
    it('should throw an error when input is empty', ()=>{
        fc.assert(fc.property(fc.constantFrom('', ' ', '  '), (reportText)=>{
            expect(()=>ReportText.from(reportText)).toThrow('ReportText must be not empty');
        }));
    });
    describe('equals', ()=>{
        it('should return true when compare two ReportText has same value', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 1
            }).map((val)=>val.trim()).filter((val)=>val.length >= 1), (reportText)=>{
                const value1 = ReportText.from(reportText);
                const value2 = ReportText.from(reportText);
                expect(value1).toBeInstanceOf(ReportText);
                expect(value2).toBeInstanceOf(ReportText);
                expect(value1.value).toEqual(reportText);
                expect(value2.value).toEqual(reportText);
                expect(value1.equals(value2)).toBe(true);
            }));
        });
        it('should return true when compare two ReportText has difference value', ()=>{
            fc.assert(fc.property(fc.record({
                reportText1: fc.string({
                    minLength: 1
                }).map((val)=>val.trim()).filter((val)=>val.length >= 1),
                reportText2: fc.string({
                    minLength: 1
                }).map((val)=>val.trim()).filter((val)=>val.length >= 1)
            }).filter(({ reportText1, reportText2 })=>reportText1 !== reportText2), ({ reportText1, reportText2 })=>{
                const value1 = ReportText.from(reportText1);
                const value2 = ReportText.from(reportText2);
                expect(value1).toBeInstanceOf(ReportText);
                expect(value2).toBeInstanceOf(ReportText);
                expect(value1.value).toEqual(reportText1);
                expect(value2.value).toEqual(reportText2);
                expect(value1.equals(value2)).toBe(false);
            }));
        });
    });
});

//# sourceMappingURL=ReportText.spec.js.map