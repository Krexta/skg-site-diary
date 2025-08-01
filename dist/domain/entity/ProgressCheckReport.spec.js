import { format } from "date-fns";
import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { ConsumedWorkersPercentage, CreateUserId, ExecutionBudgetUnitId, FileName, FilePath, ProgressReportData, ProjectId, ProjectReportId, ReportText, Title, TotalPerformancePercentage, UploadUserId, WorkerId, YEAR_MONTH_DAY_FORMAT, YearMonthDay } from "../value/index.js";
import { MAX_FILE_NAME_LENGTH } from "../value/String/BaseString.js";
import { File, ProgressCheckReport, UpdateProgressCheckReport } from "./index.js";
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
        executionBudgetUnitId: fc.uuid({
            version: 7
        }),
        progressReportData: fc.object({
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
        }),
        totalPerformancePercentage: fc.stringMatching(/^[0-9]{1,2}(\.[0-9])?$/),
        consumedWorkersPercentage: fc.stringMatching(/^[0-9](\.[0-9]{1,2})?$/),
        workerIds: fc.array(fc.uuid({
            version: 7
        }), {
            minLength: 1
        })
    }).map(({ id, createUserId, reportDate, projectId, files, title, reportText, executionBudgetUnitId, progressReportData, totalPerformancePercentage, consumedWorkersPercentage, workerIds })=>({
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
            executionBudgetUnitId: ExecutionBudgetUnitId.from(executionBudgetUnitId),
            progressReportData: ProgressReportData.from(progressReportData),
            totalPerformancePercentage: TotalPerformancePercentage.from(totalPerformancePercentage),
            consumedWorkersPercentage: ConsumedWorkersPercentage.from(consumedWorkersPercentage),
            workerIds: workerIds.map((id)=>WorkerId.from(id))
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
        executionBudgetUnitId: fc.option(fc.uuid({
            version: 7
        }), {
            nil: undefined
        }),
        progressReportData: fc.option(fc.object({
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
        }), {
            nil: undefined
        }),
        totalPerformancePercentage: fc.option(fc.stringMatching(/^[0-9]{1,2}(\.[0-9])?$/), {
            nil: undefined
        }),
        consumedWorkersPercentage: fc.option(fc.stringMatching(/^[0-9](\.[0-9]{1,2})?$/), {
            nil: undefined
        }),
        workerIds: fc.option(fc.array(fc.uuid({
            version: 7
        }), {
            minLength: 1
        }), {
            nil: undefined
        })
    }).map(({ createUserId, reportDate, projectId, files, title, reportText, executionBudgetUnitId, progressReportData, totalPerformancePercentage, consumedWorkersPercentage, workerIds })=>({
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
            executionBudgetUnitId: executionBudgetUnitId ? ExecutionBudgetUnitId.from(executionBudgetUnitId) : undefined,
            progressReportData: progressReportData ? ProgressReportData.from(progressReportData) : undefined,
            totalPerformancePercentage: totalPerformancePercentage ? TotalPerformancePercentage.from(totalPerformancePercentage) : undefined,
            consumedWorkersPercentage: consumedWorkersPercentage ? ConsumedWorkersPercentage.from(consumedWorkersPercentage) : undefined,
            workerIds: workerIds?.map((id)=>WorkerId.from(id))
        }));
}
describe('ProgressCheckReport', ()=>{
    it('Should return ProgressCheckReport when input is valid', ()=>{
        fc.assert(fc.property(makeCreateProperty(), (args)=>{
            const entity = new ProgressCheckReport(args);
            expect(entity).toBeInstanceOf(ProgressCheckReport);
            expect(entity.id.value).toEqual(args.id.value);
            expect(entity.createUserId.value).toEqual(args.createUserId.value);
            expect(entity.reportDate.toString()).toEqual(args.reportDate.toString());
            expect(entity.projectId.value).toEqual(args.projectId.value);
            expect(entity.files).toEqual(expect.arrayContaining(args.files));
            expect(entity.title.value).toEqual(args.title.value);
            expect(entity.reportText.value).toEqual(args.reportText.value);
            expect(entity.executionBudgetUnitId.value).toEqual(args.executionBudgetUnitId.value);
            expect(entity.progressReportData.value).toEqual(args.progressReportData.value);
            expect(entity.totalPerformancePercentage.value).toEqual(args.totalPerformancePercentage.value);
            expect(entity.consumedWorkersPercentage.value).toEqual(args.consumedWorkersPercentage.value);
            expect(entity.workerIds.map((id)=>id.value)).toEqual(args.workerIds.map((id)=>id.value));
        }));
    });
    describe('update', ()=>{
        it('should return UpdateProgressCheckReport when input is valid', ()=>{
            fc.assert(fc.property(fc.record({
                createArgs: makeCreateProperty(),
                updateArgs: makeUpdateProperty()
            }), ({ createArgs, updateArgs })=>{
                const entity = new ProgressCheckReport(createArgs);
                expect(entity).toBeInstanceOf(ProgressCheckReport);
                const update = entity.update(updateArgs);
                expect(update).toBeInstanceOf(UpdateProgressCheckReport);
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
                expect(update.executionBudgetUnitId?.value).toEqual(updateArgs.executionBudgetUnitId?.value);
                expect(update.progressReportData?.value).toEqual(updateArgs.progressReportData?.value);
                expect(update.totalPerformancePercentage?.value).toEqual(updateArgs.totalPerformancePercentage?.value);
                expect(update.consumedWorkersPercentage?.value).toEqual(updateArgs.consumedWorkersPercentage?.value);
                if (updateArgs.workerIds) {
                    expect(update.workerIds).toEqual(expect.arrayContaining(updateArgs.workerIds));
                } else {
                    expect(update.workerIds).toBeUndefined();
                }
            }));
        });
    });
});

//# sourceMappingURL=ProgressCheckReport.spec.js.map