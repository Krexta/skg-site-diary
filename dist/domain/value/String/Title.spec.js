import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { Title } from "./Title.js";
describe('Title', ()=>{
    it('should return Title when input is valid', ()=>{
        fc.assert(fc.property(fc.option(fc.string({
            minLength: 1
        }).map((val)=>val.trim()).filter((val)=>val.length >= 1)), (title)=>{
            const value = Title.from(title);
            expect(value).toBeInstanceOf(Title);
            expect(value.value).toEqual(title);
        }));
    });
    it('should throw an error when input is empty', ()=>{
        fc.assert(fc.property(fc.constantFrom('', ' ', '  '), (title)=>{
            expect(()=>Title.from(title)).toThrow('Title must be not empty');
        }));
    });
    describe('equals', ()=>{
        it('should return true when compare two Title has same value', ()=>{
            fc.assert(fc.property(fc.string({
                minLength: 1
            }).map((val)=>val.trim()).filter((val)=>val.length >= 1), (title)=>{
                const value1 = Title.from(title);
                const value2 = Title.from(title);
                expect(value1).toBeInstanceOf(Title);
                expect(value2).toBeInstanceOf(Title);
                expect(value1.value).toEqual(title);
                expect(value2.value).toEqual(title);
                expect(value1.equals(value2)).toBe(true);
            }));
        });
        it('should return true when compare two Title has difference value', ()=>{
            fc.assert(fc.property(fc.record({
                title1: fc.string({
                    minLength: 1
                }).map((val)=>val.trim()).filter((val)=>val.length >= 1),
                title2: fc.string({
                    minLength: 1
                }).map((val)=>val.trim()).filter((val)=>val.length >= 1)
            }).filter(({ title1, title2 })=>title1 !== title2), ({ title1, title2 })=>{
                const value1 = Title.from(title1);
                const value2 = Title.from(title2);
                expect(value1).toBeInstanceOf(Title);
                expect(value2).toBeInstanceOf(Title);
                expect(value1.value).toEqual(title1);
                expect(value2.value).toEqual(title2);
                expect(value1.equals(value2)).toBe(false);
            }));
        });
    });
});

//# sourceMappingURL=Title.spec.js.map