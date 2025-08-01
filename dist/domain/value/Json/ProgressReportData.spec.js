import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { ProgressReportData } from "./ProgressReportData.js";
describe('ProgressReportData', ()=>{
    it('should return ProgressReportData when input is valid', ()=>{
        fc.assert(fc.property(fc.object({
            key: fc.string({
                maxLength: 20
            }).filter((val)=>![
                    'constructor',
                    'toString',
                    'hasOwnProperty',
                    'valueOf',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    '__proto__'
                ].includes(val)),
            values: [
                fc.string({
                    maxLength: 256
                })
            ],
            maxDepth: 2,
            maxKeys: 5
        }), (data)=>{
            const value = ProgressReportData.from(data);
            expect(value).toBeInstanceOf(ProgressReportData);
            expect(value.value).toEqual(data);
        }));
    });
});

//# sourceMappingURL=ProgressReportData.spec.js.map