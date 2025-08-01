import { format } from "date-fns";
import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { CreateUserId, FileName, FilePath, PROJECT_STATUS_CODE_LIST, ProjectId, ProjectReportId, ProjectStatusCode, ReportText, Title, UploadUserId, YEAR_MONTH_DAY_FORMAT, YearMonthDay } from "../value/index.js";
import { MAX_FILE_NAME_LENGTH } from "../value/String/BaseString.js";
import { File, ProjectStatusUpdateReport, UpdateProjectStatusUpdateReport } from "./index.js";
function makeCreateProperty() {
    return fc.record({
        id: fc.uuid({
            version: 7
        }),
        createUserId: fc.uuid({
            version: 7
        }),
        reportDate: fc.date({
            min: new Date(0, 0, 0, 0, 0, 0),
            max: new Date(9998, 12, 31, 23, 59, 59)
        }).map((val)=>format(val, YEAR_MONTH_DAY_FORMAT)),
        projectId: fc.uuid({
            version: 7
        }),
        files: fc.array(fc.record({
            name: fc.string({
                minLength: 1,
                maxLength: MAX_FILE_NAME_LENGTH
            }).map((val)=>val.trim()).filter((val)=>val.length >= 1),
            path: fc.webUrl(),
            uploadUserId: fc.uuid({
                version: 7
            })
        }), {
            minLength: 1
        }),
        title: fc.string({
            minLength: 1
        }).map((val)=>val.trim()).filter((val)=>val.length >= 1),
        reportText: fc.string({
            minLength: 1
        }).map((val)=>val.trim()).filter((val)=>val.length >= 1),
        projectStatusCode: fc.constantFrom(...PROJECT_STATUS_CODE_LIST)
    }).map(({ id, createUserId, reportDate, projectId, files, title, reportText, projectStatusCode })=>({
            id: ProjectReportId.from(id),
            createUserId: CreateUserId.from(createUserId),
            reportDate: YearMonthDay.from(reportDate),
            projectId: ProjectId.from(projectId),
            files: files.map((file)=>new File({
                    name: FileName.from(file.name),
                    path: FilePath.from(file.path),
                    uploadUserId: UploadUserId.from(file.uploadUserId)
                })),
            title: Title.from(title),
            reportText: ReportText.from(reportText),
            projectStatusCode: ProjectStatusCode.from(projectStatusCode)
        }));
}
function makeUpdateProperty() {
    return fc.record({
        createUserId: fc.option(fc.uuid({
            version: 7
        }), {
            nil: undefined
        }),
        reportDate: fc.option(fc.date({
            min: new Date(0, 0, 0, 0, 0, 0),
            max: new Date(9998, 12, 31, 23, 59, 59)
        }).map((val)=>format(val, YEAR_MONTH_DAY_FORMAT)), {
            nil: undefined
        }),
        projectId: fc.option(fc.uuid({
            version: 7
        }), {
            nil: undefined
        }),
        files: fc.option(fc.array(fc.record({
            name: fc.string({
                minLength: 1,
                maxLength: MAX_FILE_NAME_LENGTH
            }).map((val)=>val.trim()).filter((val)=>val.length >= 1),
            path: fc.webUrl(),
            uploadUserId: fc.uuid({
                version: 7
            })
        }), {
            minLength: 1
        }), {
            nil: undefined
        }),
        title: fc.option(fc.string({
            minLength: 1
        }).map((val)=>val.trim()).filter((val)=>val.length >= 1), {
            nil: undefined
        }),
        reportText: fc.option(fc.string({
            minLength: 1
        }).map((val)=>val.trim()).filter((val)=>val.length >= 1), {
            nil: undefined
        }),
        projectStatusCode: fc.option(fc.constantFrom(...PROJECT_STATUS_CODE_LIST), {
            nil: undefined
        })
    }).map(({ createUserId, reportDate, projectId, files, title, reportText, projectStatusCode })=>({
            createUserId: createUserId ? CreateUserId.from(createUserId) : undefined,
            reportDate: reportDate ? YearMonthDay.from(reportDate) : undefined,
            projectId: projectId ? ProjectId.from(projectId) : undefined,
            files: files?.map((file)=>new File({
                    name: FileName.from(file.name),
                    path: FilePath.from(file.path),
                    uploadUserId: UploadUserId.from(file.uploadUserId)
                })),
            title: title ? Title.from(title) : undefined,
            reportText: reportText ? ReportText.from(reportText) : undefined,
            projectStatusCode: projectStatusCode ? ProjectStatusCode.from(projectStatusCode) : undefined
        }));
}
describe('ProjectStatusUpdateReport', ()=>{
    it('should return ProjectStatusUpdateReport when input is valid', ()=>{
        fc.assert(fc.property(makeCreateProperty(), (args)=>{
            const entity = new ProjectStatusUpdateReport(args);
            expect(entity).toBeInstanceOf(ProjectStatusUpdateReport);
            expect(entity.id.value).toEqual(args.id.value);
            expect(entity.createUserId.value).toEqual(args.createUserId.value);
            expect(entity.reportDate.toString()).toEqual(args.reportDate.toString());
            expect(entity.projectId.value).toEqual(args.projectId.value);
            expect(entity.files).toEqual(expect.arrayContaining(args.files));
            expect(entity.title.value).toEqual(args.title.value);
            expect(entity.reportText.value).toEqual(args.reportText.value);
            expect(entity.projectStatusCode.value).toEqual(args.projectStatusCode.value);
        }));
    });
    describe('update', ()=>{
        it('should return UpdateProjectStatusUpdateReport when input is valid', ()=>{
            fc.assert(fc.property(fc.record({
                createArgs: makeCreateProperty(),
                updateArgs: makeUpdateProperty()
            }), ({ createArgs, updateArgs })=>{
                const entity = new ProjectStatusUpdateReport(createArgs);
                expect(entity).toBeInstanceOf(ProjectStatusUpdateReport);
                const update = entity.update(updateArgs);
                expect(update).toBeInstanceOf(UpdateProjectStatusUpdateReport);
                expect(update.id.value).toEqual(entity.id.value);
                expect(update.createUserId?.value).toEqual(updateArgs.createUserId?.value);
                expect(update.reportDate?.toString()).toEqual(updateArgs.reportDate?.toString());
                if (updateArgs.files) {
                    expect(update.files).toEqual(expect.arrayContaining(updateArgs.files));
                } else {
                    expect(update.files).toBeUndefined();
                }
                expect(update.title?.value).toEqual(updateArgs.title?.value);
                expect(update.reportText?.value).toEqual(updateArgs.reportText?.value);
                expect(update.projectStatusCode?.value).toEqual(updateArgs.projectStatusCode?.value);
            }));
        });
    });
});

//# sourceMappingURL=ProjectStatusUpdateReport.spec.js.map