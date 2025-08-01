import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { MAX_FILE_NAME_LENGTH } from "./BaseString.js";
import { FileName } from "./Name.js";
describe('Name', ()=>{
    describe('FileName', ()=>{
        it('should return FileName when input is valid', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 1,
                maxLength: MAX_FILE_NAME_LENGTH
            }).map((val)=>val.trim()).filter((val)=>val.length >= 1), (name)=>{
                const value = FileName.from(name);
                expect(value).toBeInstanceOf(FileName);
                expect(value.value).toEqual(name);
            }));
        });
        it('should throw an error when input is empty', ()=>{
            fc.assert(fc.property(fc.constantFrom('', ' ', '  '), (name)=>{
                expect(()=>FileName.from(name)).toThrow('FileName must be not empty');
            }));
        });
        it('should throw an error when input is too long', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: MAX_FILE_NAME_LENGTH + 1
            }).map((val)=>val.trim()).filter((val)=>val.length > MAX_FILE_NAME_LENGTH), (name)=>{
                expect(()=>FileName.from(name)).toThrow(`FileName has maximum length of ${MAX_FILE_NAME_LENGTH}`);
            }));
        });
        describe('equals', ()=>{
            it('should return true when compare two FileName has same value', ()=>{
                fc.assert(fc.property(fc.string({
                    minLength: 1,
                    maxLength: MAX_FILE_NAME_LENGTH
                }).map((val)=>val.trim()).filter((val)=>val.length >= 1), (name)=>{
                    const value1 = FileName.from(name);
                    const value2 = FileName.from(name);
                    expect(value1).toBeInstanceOf(FileName);
                    expect(value2).toBeInstanceOf(FileName);
                    expect(value1.value).toEqual(name);
                    expect(value2.value).toEqual(name);
                    expect(value1.equals(value2)).toBe(true);
                }));
            });
            it('should return true when compare two FileName has difference value', ()=>{
                fc.assert(fc.property(fc.record({
                    name1: fc.string({
                        minLength: 1,
                        maxLength: MAX_FILE_NAME_LENGTH
                    }).map((val)=>val.trim()).filter((val)=>val.length >= 1),
                    name2: fc.string({
                        minLength: 1,
                        maxLength: MAX_FILE_NAME_LENGTH
                    }).map((val)=>val.trim()).filter((val)=>val.length >= 1)
                }).filter(({ name1, name2 })=>name1 !== name2), ({ name1, name2 })=>{
                    const value1 = FileName.from(name1);
                    const value2 = FileName.from(name2);
                    expect(value1).toBeInstanceOf(FileName);
                    expect(value2).toBeInstanceOf(FileName);
                    expect(value1.value).toEqual(name1);
                    expect(value2.value).toEqual(name2);
                    expect(value1.equals(value2)).toBe(false);
                }));
            });
        });
    });
});

//# sourceMappingURL=Name.spec.js.map