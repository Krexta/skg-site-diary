import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { CloseReportChecklist } from "./CloseReportChecklist.js";
describe('CloseReportChecklist', ()=>{
    it('should return CloseReportChecklist when input is valid', ()=>{
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
        }), (checklist)=>{
            const value = CloseReportChecklist.from(checklist);
            expect(value).toBeInstanceOf(CloseReportChecklist);
            expect(value.value).toEqual(checklist);
        }));
    });
});

//# sourceMappingURL=CloseReportChecklist.spec.js.map