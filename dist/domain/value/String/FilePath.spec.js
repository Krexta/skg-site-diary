import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { FilePath } from "./FilePath.js";
describe('FilePath', ()=>{
    it('should return FilePath when input is valid', ()=>{
        fc.assert(fc.property(fc.string({
            minLength: 1
        }).map((val)=>val.trim()).filter((val)=>val.length >= 1), (filePath)=>{
            const value = FilePath.from(filePath);
            expect(value).toBeInstanceOf(FilePath);
            expect(value.value).toEqual(filePath);
        }));
    });
    it('should throw an error when input is empty', ()=>{
        fc.assert(fc.property(fc.constantFrom('', ' ', '  '), (filePath)=>{
            expect(()=>FilePath.from(filePath)).toThrow('FilePath must be not empty');
        }));
    });
    describe('equals', ()=>{
        it('should return true when compare two FilePath has same value', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 1
            }).map((val)=>val.trim()).filter((val)=>val.length >= 1), (filePath)=>{
                const value1 = FilePath.from(filePath);
                const value2 = FilePath.from(filePath);
                expect(value1).toBeInstanceOf(FilePath);
                expect(value2).toBeInstanceOf(FilePath);
                expect(value1.value).toEqual(filePath);
                expect(value2.value).toEqual(filePath);
                expect(value1.equals(value2)).toBe(true);
            }));
        });
        it('should return true when compare two FilePath has difference value', ()=>{
            fc.assert(fc.property(fc.record({
                filePath1: fc.string({
                    minLength: 1
                }).map((val)=>val.trim()).filter((val)=>val.length >= 1),
                filePath2: fc.string({
                    minLength: 1
                }).map((val)=>val.trim()).filter((val)=>val.length >= 1)
            }).filter(({ filePath1, filePath2 })=>filePath1 !== filePath2), ({ filePath1, filePath2 })=>{
                const value1 = FilePath.from(filePath1);
                const value2 = FilePath.from(filePath2);
                expect(value1).toBeInstanceOf(FilePath);
                expect(value2).toBeInstanceOf(FilePath);
                expect(value1.value).toEqual(filePath1);
                expect(value2.value).toEqual(filePath2);
                expect(value1.equals(value2)).toBe(false);
            }));
        });
    });
});

//# sourceMappingURL=FilePath.spec.js.map