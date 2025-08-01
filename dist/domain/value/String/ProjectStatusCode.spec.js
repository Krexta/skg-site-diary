import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { PROJECT_STATUS_CODE_LIST, ProjectStatusCode } from "./ProjectStatusCode.js";
describe('ProjectStatusCode', ()=>{
    it('should return ProjectStatusCode when input is valid', ()=>{
        fc.assert(fc.property(fc.constantFrom(...PROJECT_STATUS_CODE_LIST), (code)=>{
            const value = ProjectStatusCode.from(code);
            expect(value).toBeInstanceOf(ProjectStatusCode);
            expect(value.value).toEqual(code);
        }));
    });
    it('should throw an error when input is invalid', ()=>{
        fc.assert(fc.property(fc.string().filter((val)=>!PROJECT_STATUS_CODE_LIST.includes(val)), (code)=>{
            expect(()=>ProjectStatusCode.from(code)).toThrow('Invalid project status code');
        }));
    });
    describe('equals', ()=>{
        it('should return true when compare two ProjectStatusCode has same value', ()=>{
            fc.assert(fc.property(fc.constantFrom(...PROJECT_STATUS_CODE_LIST), (code)=>{
                const value1 = ProjectStatusCode.from(code);
                const value2 = ProjectStatusCode.from(code);
                expect(value1).toBeInstanceOf(ProjectStatusCode);
                expect(value2).toBeInstanceOf(ProjectStatusCode);
                expect(value1.value).toEqual(code);
                expect(value2.value).toEqual(code);
                expect(value1.equals(value2)).toBe(true);
            }));
        });
        it('should return true when compare two ProjectStatusCode has difference value', ()=>{
            fc.assert(fc.property(fc.record({
                code1: fc.constantFrom(...PROJECT_STATUS_CODE_LIST),
                code2: fc.constantFrom(...PROJECT_STATUS_CODE_LIST)
            }).filter(({ code1, code2 })=>code1 !== code2), ({ code1, code2 })=>{
                const value1 = ProjectStatusCode.from(code1);
                const value2 = ProjectStatusCode.from(code2);
                expect(value1).toBeInstanceOf(ProjectStatusCode);
                expect(value2).toBeInstanceOf(ProjectStatusCode);
                expect(value1.value).toEqual(code1);
                expect(value2.value).toEqual(code2);
                expect(value1.equals(value2)).toBe(false);
            }));
        });
    });
});

//# sourceMappingURL=ProjectStatusCode.spec.js.map