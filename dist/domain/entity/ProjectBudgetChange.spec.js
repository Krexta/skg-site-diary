import { format } from "date-fns";
import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { BillingClientId, CHANGE_REASON_CODE_LIST, ChangeReasonCode, CreateUserId, FileName, FilePath, ProjectId, ProjectReportId, ReportText, Title, UploadUserId, YEAR_MONTH_DAY_FORMAT, YearMonthDay } from "../value/index.js";
import { MAX_FILE_NAME_LENGTH } from "../value/String/BaseString.js";
import { File, ProjectBudgetChange, UpdateProjectBudgetChange } from "./index.js";
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
        changeReasonCode: fc.constantFrom(...CHANGE_REASON_CODE_LIST),
        billingClientId: fc.uuid({
            version: 7
        })
    }).map(({ id, createUserId, reportDate, projectId, files, title, reportText, changeReasonCode, billingClientId })=>({
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
            changeReasonCode: ChangeReasonCode.from(changeReasonCode),
            billingClientId: BillingClientId.from(billingClientId)
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
        changeReasonCode: fc.option(fc.constantFrom(...CHANGE_REASON_CODE_LIST), {
            nil: undefined
        }),
        billingClientId: fc.option(fc.uuid({
            version: 7
        }), {
            nil: undefined
        })
    }).map(({ createUserId, reportDate, projectId, files, title, reportText, changeReasonCode, billingClientId })=>({
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
            changeReasonCode: changeReasonCode ? ChangeReasonCode.from(changeReasonCode) : undefined,
            billingClientId: billingClientId ? BillingClientId.from(billingClientId) : undefined
        }));
}
describe('ProjectBudgetChange', ()=>{
    it('should return ProjectBudgetChange when input is valid', ()=>{
        fc.assert(fc.property(makeCreateProperty(), (args)=>{
            const entity = new ProjectBudgetChange(args);
            expect(entity).toBeInstanceOf(ProjectBudgetChange);
            expect(entity.id.value).toEqual(args.id.value);
            expect(entity.createUserId.value).toEqual(args.createUserId.value);
            expect(entity.reportDate.toString()).toEqual(args.reportDate.toString());
            expect(entity.projectId.value).toEqual(args.projectId.value);
            expect(entity.files).toEqual(expect.arrayContaining(args.files));
            expect(entity.title.value).toEqual(args.title.value);
            expect(entity.reportText.value).toEqual(args.reportText.value);
            expect(entity.changeReasonCode.value).toEqual(args.changeReasonCode.value);
            expect(entity.billingClientId.value).toEqual(args.billingClientId.value);
        }));
    });
    describe('update', ()=>{
        it('should return UpdateProjectBudgetChange when input is valid', ()=>{
            fc.assert(fc.property(fc.record({
                createArgs: makeCreateProperty(),
                updateArgs: makeUpdateProperty()
            }), ({ createArgs, updateArgs })=>{
                const entity = new ProjectBudgetChange(createArgs);
                expect(entity).toBeInstanceOf(ProjectBudgetChange);
                const update = entity.update(updateArgs);
                expect(update).toBeInstanceOf(UpdateProjectBudgetChange);
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
                expect(update.changeReasonCode?.value).toEqual(updateArgs.changeReasonCode?.value);
                expect(update.billingClientId?.value).toEqual(updateArgs.billingClientId?.value);
            }));
        });
    });
});

//# sourceMappingURL=ProjectBudgetChange.spec.js.map