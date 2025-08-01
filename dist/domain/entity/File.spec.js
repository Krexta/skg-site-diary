import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { FileName, FilePath, UploadUserId } from "../value/index.js";
import { MAX_FILE_NAME_LENGTH } from "../value/String/BaseString.js";
import { File } from "./File.js";
function createProperty() {
    return fc.record({
        name: fc.string({
            minLength: 1,
            maxLength: MAX_FILE_NAME_LENGTH
        }).map((val)=>val.trim()).filter((val)=>val.length >= 1),
        path: fc.string({
            minLength: 1
        }).map((val)=>val.trim()).filter((val)=>val.length >= 1),
        uploadUserId: fc.uuid({
            version: 7
        })
    }).map(({ name, path, uploadUserId })=>({
            name: FileName.from(name),
            path: FilePath.from(path),
            uploadUserId: UploadUserId.from(uploadUserId)
        }));
}
describe('File', ()=>{
    it('Should return File when input is valid', ()=>{
        fc.assert(fc.property(createProperty(), (args)=>{
            const entity = new File(args);
            expect(entity).toBeInstanceOf(File);
            expect(entity.name.value).toEqual(args.name.value);
            expect(entity.path.value).toEqual(args.path.value);
            expect(entity.uploadUserId.value).toEqual(args.uploadUserId.value);
        }));
    });
});

//# sourceMappingURL=File.spec.js.map