import { Test } from "@nestjs/testing";
import { format } from "date-fns";
import fc from "fast-check";
import { afterAll, assert, beforeAll, describe, expect, it, vi } from "vitest";
import { ReportTable } from "../../infrastructure/persistence/project-report/index.js";
import { PrismaService } from "../../infrastructure/service/index.js";
import { PrismaModule } from "../../module/prisma.module.js";
import { UtilityModule } from "../../module/utility.module.js";
import { File, ProgressCheckReport, ProjectBudgetChange, ProjectCloseReport, ProjectCommonReport, ProjectMeetingReport, ProjectStatusUpdateReport, ProjectWorkerReport } from "../entity/index.js";
import { BillingClientId, CHANGE_REASON_CODE_LIST, ChangeReasonCode, CloseReportChecklist, ConsumedWorkersPercentage, CreateUserId, ExecutionBudgetUnitId, FileName, FilePath, ProgressReportData, PROJECT_STATUS_CODE_LIST, ProjectId, ProjectReportId, ProjectStatusCode, ReportText, ReportTypeCode, Title, TotalPerformancePercentage, UploadUserId, WorkerId, YEAR_MONTH_DAY_FORMAT, YearMonthDay } from "../value/index.js";
import { MAX_FILE_NAME_LENGTH, MAX_REPORT_TYPE_CODE_LENGTH } from "../value/String/BaseString.js";
import { ReportRepository } from "./report.repository.js";
function makeCreateProgressCheckReportProperty() {
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
        }),
        projectId: fc.uuid({
            version: 7
        }),
        files: fc.array(fc.record({
            name: fc.string({
                minLength: 1,
                maxLength: MAX_FILE_NAME_LENGTH
            }).map((val)=>val.trim()).filter((val)=>val.length > 0),
            path: fc.webUrl(),
            uploadUserId: fc.uuid({
                version: 7
            })
        })),
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
        }).map((workerIds)=>[
                ...new Set(workerIds)
            ])
    }).map(({ id, createUserId, reportDate, projectId, files, title, reportText, executionBudgetUnitId, progressReportData, totalPerformancePercentage, consumedWorkersPercentage, workerIds })=>{
        return new ProgressCheckReport({
            id: ProjectReportId.from(id),
            createUserId: CreateUserId.from(createUserId),
            reportDate: YearMonthDay.from(format(reportDate, YEAR_MONTH_DAY_FORMAT)),
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
        });
    });
}
function makeCreateProjectBudgetChangeProperty() {
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
    }).map(({ id, createUserId, reportDate, projectId, files, title, reportText, changeReasonCode, billingClientId })=>{
        return new ProjectBudgetChange({
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
        });
    });
}
function makeCreateProjectCloseReportProperty() {
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
        closeReportChecklist: fc.object({
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
        })
    }).map(({ id, createUserId, reportDate, projectId, files, title, reportText, closeReportChecklist })=>{
        return new ProjectCloseReport({
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
            closeReportChecklist: CloseReportChecklist.from(closeReportChecklist)
        });
    });
}
function makeCreateProjectCommonReportProperty() {
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
        }).map((val)=>val.trim()).filter((val)=>val.length >= 1)
    }).map(({ id, createUserId, reportDate, projectId, files, title, reportText })=>{
        return new ProjectCommonReport({
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
            reportText: ReportText.from(reportText)
        });
    });
}
function makeCreateProjectMeetingReportProperty() {
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
        }).map((val)=>val.trim()).filter((val)=>val.length >= 1)
    }).map(({ id, createUserId, reportDate, projectId, files, title, reportText })=>{
        return new ProjectMeetingReport({
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
            reportText: ReportText.from(reportText)
        });
    });
}
function makeCreateProjectStatusUpdateReportProperty() {
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
    }).map(({ id, createUserId, reportDate, projectId, files, title, reportText, projectStatusCode })=>{
        return new ProjectStatusUpdateReport({
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
        });
    });
}
function makeCreateProjectWorkerReportProperty() {
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
        reportTypeCode: fc.string({
            minLength: 1,
            maxLength: MAX_REPORT_TYPE_CODE_LENGTH
        }).map((val)=>val.trim()).filter((val)=>val.length >= 1),
        workerIds: fc.array(fc.uuid({
            version: 7
        }), {
            minLength: 1
        })
    }).map(({ id, createUserId, reportDate, projectId, files, title, reportText, reportTypeCode, workerIds })=>{
        return new ProjectWorkerReport({
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
            reportTypeCode: ReportTypeCode.from(reportTypeCode),
            workerIds: workerIds.map((id)=>WorkerId.from(id))
        });
    });
}
function makeUpdateProgressCheckReportProperty() {
    return fc.record({
        createUserId: fc.option(fc.uuid({
            version: 7
        }), {
            nil: undefined
        }),
        reportDate: fc.option(fc.date({
            min: new Date(0, 0, 0, 0, 0, 0),
            max: new Date(9998, 12, 31, 23, 59, 59)
        }), {
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
            }).map((val)=>val.trim()).filter((val)=>val.length > 0),
            path: fc.webUrl(),
            uploadUserId: fc.uuid({
                version: 7
            })
        })), {
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
        }).map((workerIds)=>[
                ...new Set(workerIds)
            ]), {
            nil: undefined
        })
    }).map(({ createUserId, reportDate, projectId, files, title, reportText, executionBudgetUnitId, progressReportData, totalPerformancePercentage, consumedWorkersPercentage, workerIds })=>{
        return {
            createUserId: createUserId ? CreateUserId.from(createUserId) : undefined,
            reportDate: reportDate ? YearMonthDay.from(format(reportDate, YEAR_MONTH_DAY_FORMAT)) : undefined,
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
        };
    });
}
function makeUpdateProjectBudgetChangeProperty() {
    return fc.record({
        createUserId: fc.option(fc.uuid({
            version: 7
        }), {
            nil: undefined
        }),
        reportDate: fc.option(fc.date({
            min: new Date(0, 0, 0, 0, 0, 0),
            max: new Date(9998, 12, 31, 23, 59, 59)
        }), {
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
            }).map((val)=>val.trim()).filter((val)=>val.length > 0),
            path: fc.webUrl(),
            uploadUserId: fc.uuid({
                version: 7
            })
        })), {
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
    }).map(({ createUserId, reportDate, projectId, files, title, reportText, changeReasonCode, billingClientId })=>{
        return {
            createUserId: createUserId ? CreateUserId.from(createUserId) : undefined,
            reportDate: reportDate ? YearMonthDay.from(format(reportDate, YEAR_MONTH_DAY_FORMAT)) : undefined,
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
        };
    });
}
function makeUpdateProjectCloseReportProperty() {
    return fc.record({
        createUserId: fc.option(fc.uuid({
            version: 7
        }), {
            nil: undefined
        }),
        reportDate: fc.option(fc.date({
            min: new Date(0, 0, 0, 0, 0, 0),
            max: new Date(9998, 12, 31, 23, 59, 59)
        }), {
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
            }).map((val)=>val.trim()).filter((val)=>val.length > 0),
            path: fc.webUrl(),
            uploadUserId: fc.uuid({
                version: 7
            })
        })), {
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
        closeReportChecklist: fc.option(fc.object({
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
        })
    }).map(({ createUserId, reportDate, projectId, files, title, reportText, closeReportChecklist })=>{
        return {
            createUserId: createUserId ? CreateUserId.from(createUserId) : undefined,
            reportDate: reportDate ? YearMonthDay.from(format(reportDate, YEAR_MONTH_DAY_FORMAT)) : undefined,
            projectId: projectId ? ProjectId.from(projectId) : undefined,
            files: files?.map((file)=>new File({
                    name: FileName.from(file.name),
                    path: FilePath.from(file.path),
                    uploadUserId: UploadUserId.from(file.uploadUserId)
                })),
            title: title ? Title.from(title) : undefined,
            reportText: reportText ? ReportText.from(reportText) : undefined,
            closeReportChecklist: closeReportChecklist ? CloseReportChecklist.from(closeReportChecklist) : undefined
        };
    });
}
function makeUpdateProjectCommonReportProperty() {
    return fc.record({
        createUserId: fc.option(fc.uuid({
            version: 7
        }), {
            nil: undefined
        }),
        reportDate: fc.option(fc.date({
            min: new Date(0, 0, 0, 0, 0, 0),
            max: new Date(9998, 12, 31, 23, 59, 59)
        }), {
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
            }).map((val)=>val.trim()).filter((val)=>val.length > 0),
            path: fc.webUrl(),
            uploadUserId: fc.uuid({
                version: 7
            })
        })), {
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
        })
    }).map(({ createUserId, reportDate, projectId, files, title, reportText })=>{
        return {
            createUserId: createUserId ? CreateUserId.from(createUserId) : undefined,
            reportDate: reportDate ? YearMonthDay.from(format(reportDate, YEAR_MONTH_DAY_FORMAT)) : undefined,
            projectId: projectId ? ProjectId.from(projectId) : undefined,
            files: files?.map((file)=>new File({
                    name: FileName.from(file.name),
                    path: FilePath.from(file.path),
                    uploadUserId: UploadUserId.from(file.uploadUserId)
                })),
            title: title ? Title.from(title) : undefined,
            reportText: reportText ? ReportText.from(reportText) : undefined
        };
    });
}
function makeUpdateProjectMeetingReportProperty() {
    return fc.record({
        createUserId: fc.option(fc.uuid({
            version: 7
        }), {
            nil: undefined
        }),
        reportDate: fc.option(fc.date({
            min: new Date(0, 0, 0, 0, 0, 0),
            max: new Date(9998, 12, 31, 23, 59, 59)
        }), {
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
            }).map((val)=>val.trim()).filter((val)=>val.length > 0),
            path: fc.webUrl(),
            uploadUserId: fc.uuid({
                version: 7
            })
        })), {
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
        })
    }).map(({ createUserId, reportDate, projectId, files, title, reportText })=>{
        return {
            createUserId: createUserId ? CreateUserId.from(createUserId) : undefined,
            reportDate: reportDate ? YearMonthDay.from(format(reportDate, YEAR_MONTH_DAY_FORMAT)) : undefined,
            projectId: projectId ? ProjectId.from(projectId) : undefined,
            files: files?.map((file)=>new File({
                    name: FileName.from(file.name),
                    path: FilePath.from(file.path),
                    uploadUserId: UploadUserId.from(file.uploadUserId)
                })),
            title: title ? Title.from(title) : undefined,
            reportText: reportText ? ReportText.from(reportText) : undefined
        };
    });
}
function makeUpdateProjectStatusUpdateReportProperty() {
    return fc.record({
        createUserId: fc.option(fc.uuid({
            version: 7
        }), {
            nil: undefined
        }),
        reportDate: fc.option(fc.date({
            min: new Date(0, 0, 0, 0, 0, 0),
            max: new Date(9998, 12, 31, 23, 59, 59)
        }), {
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
            }).map((val)=>val.trim()).filter((val)=>val.length > 0),
            path: fc.webUrl(),
            uploadUserId: fc.uuid({
                version: 7
            })
        })), {
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
        projectStatusCode: fc.constantFrom(...PROJECT_STATUS_CODE_LIST)
    }).map(({ createUserId, reportDate, projectId, files, title, reportText, projectStatusCode })=>{
        return {
            createUserId: createUserId ? CreateUserId.from(createUserId) : undefined,
            reportDate: reportDate ? YearMonthDay.from(format(reportDate, YEAR_MONTH_DAY_FORMAT)) : undefined,
            projectId: projectId ? ProjectId.from(projectId) : undefined,
            files: files?.map((file)=>new File({
                    name: FileName.from(file.name),
                    path: FilePath.from(file.path),
                    uploadUserId: UploadUserId.from(file.uploadUserId)
                })),
            title: title ? Title.from(title) : undefined,
            reportText: reportText ? ReportText.from(reportText) : undefined,
            projectStatusCode: projectStatusCode ? ProjectStatusCode.from(projectStatusCode) : undefined
        };
    });
}
function makeUpdateProjectWorkerReportProperty() {
    return fc.record({
        createUserId: fc.option(fc.uuid({
            version: 7
        }), {
            nil: undefined
        }),
        reportDate: fc.option(fc.date({
            min: new Date(0, 0, 0, 0, 0, 0),
            max: new Date(9998, 12, 31, 23, 59, 59)
        }), {
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
            }).map((val)=>val.trim()).filter((val)=>val.length > 0),
            path: fc.webUrl(),
            uploadUserId: fc.uuid({
                version: 7
            })
        })), {
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
        reportTypeCode: fc.string({
            minLength: 1,
            maxLength: MAX_REPORT_TYPE_CODE_LENGTH
        }).map((val)=>val.trim()).filter((val)=>val.length >= 1),
        workerIds: fc.array(fc.uuid({
            version: 7
        }), {
            minLength: 1
        })
    }).map(({ createUserId, reportDate, projectId, files, title, reportText, reportTypeCode, workerIds })=>{
        return {
            createUserId: createUserId ? CreateUserId.from(createUserId) : undefined,
            reportDate: reportDate ? YearMonthDay.from(format(reportDate, YEAR_MONTH_DAY_FORMAT)) : undefined,
            projectId: projectId ? ProjectId.from(projectId) : undefined,
            files: files?.map((file)=>new File({
                    name: FileName.from(file.name),
                    path: FilePath.from(file.path),
                    uploadUserId: UploadUserId.from(file.uploadUserId)
                })),
            title: title ? Title.from(title) : undefined,
            reportText: reportText ? ReportText.from(reportText) : undefined,
            reportTypeCode: reportTypeCode ? ReportTypeCode.from(reportTypeCode) : undefined,
            workerIds: workerIds?.map((id)=>WorkerId.from(id))
        };
    });
}
function makeFilesProperty() {
    return fc.array(fc.record({
        name: fc.string({
            minLength: 1,
            maxLength: MAX_FILE_NAME_LENGTH
        }).map((val)=>val.trim()).filter((val)=>val.length >= 1).map(FileName.from),
        path: fc.webUrl().map(FilePath.from)
    }), {
        minLength: 2
    });
}
describe('ReportRepository', ()=>{
    let repository;
    let prisma;
    const ids = [];
    beforeAll(async ()=>{
        vi.stubEnv('DATABASE_URL', process.env.DATABASE_URL_TEST ?? 'NotFound');
        const module = await Test.createTestingModule({
            imports: [
                UtilityModule,
                PrismaModule
            ],
            providers: [
                {
                    provide: ReportRepository,
                    useClass: ReportTable
                }
            ]
        }).compile();
        repository = module.get(ReportRepository);
        prisma = await module.resolve(PrismaService);
    });
    afterAll(async ()=>{
        await prisma.project_report.deleteMany({
            where: {
                project_report_id: {
                    in: ids
                }
            }
        });
        vi.unstubAllEnvs();
    });
    describe('createProgressCheckReport', ()=>{
        it('should return ProgressCheckReport when input is valid', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProgressCheckReportProperty(), async (data)=>{
                fc.pre(!ids.includes(data.id.value));
                ids.push(data.id.value);
                const entity = await repository.createProgressCheckReport(data);
                assert.isNotNull(await prisma.project_report.findFirst({
                    where: {
                        project_report_id: data.id.value
                    }
                }));
                expect(entity).toBeInstanceOf(ProgressCheckReport);
                expect(entity.id.value).toEqual(data.id.value);
                expect(entity.createUserId.value).toEqual(data.createUserId.value);
                expect(entity.reportDate.toString()).toEqual(data.reportDate.toString());
                expect(entity.projectId.value).toEqual(data.projectId.value);
                expect(entity.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(data.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(entity.title.value).toEqual(data.title.value);
                expect(entity.reportText.value).toEqual(data.reportText.value);
                expect(entity.executionBudgetUnitId.value).toEqual(data.executionBudgetUnitId.value);
                expect(entity.progressReportData.value).toEqual(data.progressReportData.value);
                expect(Number(entity.totalPerformancePercentage.toValue())).toEqual(Number(data.totalPerformancePercentage.toValue()));
                expect(Number(entity.consumedWorkersPercentage.toValue())).toEqual(Number(data.consumedWorkersPercentage.toValue()));
                expect(entity.workerIds.map((id)=>id.value)).toEqual(expect.arrayContaining(data.workerIds.map((id)=>id.value)));
            }));
        });
    });
    describe('createProjectBudgetChange', ()=>{
        it('should return ProjectBudgetChange when input is valid', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectBudgetChangeProperty(), async (data)=>{
                fc.pre(!ids.includes(data.id.value));
                ids.push(data.id.value);
                const entity = await repository.createProjectBudgetChange(data);
                assert.isNotNull(await prisma.project_report.findFirst({
                    where: {
                        project_report_id: data.id.value
                    }
                }));
                expect(entity).toBeInstanceOf(ProjectBudgetChange);
                expect(entity.id.value).toEqual(data.id.value);
                expect(entity.createUserId.value).toEqual(data.createUserId.value);
                expect(entity.reportDate.toString()).toEqual(data.reportDate.toString());
                expect(entity.projectId.value).toEqual(data.projectId.value);
                expect(entity.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(data.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(entity.title.value).toEqual(data.title.value);
                expect(entity.reportText.value).toEqual(data.reportText.value);
                expect(entity.changeReasonCode.value).toEqual(data.changeReasonCode.value);
                expect(entity.billingClientId.value).toEqual(data.billingClientId.value);
            }));
        });
    });
    describe('createProjectCloseReport', ()=>{
        it('should return ProjectCloseReport when input is valid', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectCloseReportProperty(), async (data)=>{
                fc.pre(!ids.includes(data.id.value));
                ids.push(data.id.value);
                const entity = await repository.createProjectCloseReport(data);
                assert.isNotNull(await prisma.project_report.findFirst({
                    where: {
                        project_report_id: data.id.value
                    }
                }));
                expect(entity).toBeInstanceOf(ProjectCloseReport);
                expect(entity.id.value).toEqual(data.id.value);
                expect(entity.createUserId.value).toEqual(data.createUserId.value);
                expect(entity.reportDate.toString()).toEqual(data.reportDate.toString());
                expect(entity.projectId.value).toEqual(data.projectId.value);
                expect(entity.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(data.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(entity.title.value).toEqual(data.title.value);
                expect(entity.reportText.value).toEqual(data.reportText.value);
                expect(entity.closeReportChecklist.value).toEqual(data.closeReportChecklist.value);
            }));
        });
    });
    describe('createProjectCommonReport', ()=>{
        it('should return ProjectCommonReport when input is valid', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectCommonReportProperty(), async (data)=>{
                fc.pre(!ids.includes(data.id.value));
                ids.push(data.id.value);
                const entity = await repository.createProjectCommonReport(data);
                assert.isNotNull(await prisma.project_report.findFirst({
                    where: {
                        project_report_id: data.id.value
                    }
                }));
                expect(entity).toBeInstanceOf(ProjectCommonReport);
                expect(entity.id.value).toEqual(data.id.value);
                expect(entity.createUserId.value).toEqual(data.createUserId.value);
                expect(entity.reportDate.toString()).toEqual(data.reportDate.toString());
                expect(entity.projectId.value).toEqual(data.projectId.value);
                expect(entity.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(data.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(entity.title.value).toEqual(data.title.value);
                expect(entity.reportText.value).toEqual(data.reportText.value);
            }));
        });
    });
    describe('createProjectMeetingReport', ()=>{
        it('should return ProjectMeetingReport when input is valid', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectMeetingReportProperty(), async (data)=>{
                fc.pre(!ids.includes(data.id.value));
                ids.push(data.id.value);
                const entity = await repository.createProjectMeetingReport(data);
                assert.isNotNull(await prisma.project_report.findFirst({
                    where: {
                        project_report_id: data.id.value
                    }
                }));
                expect(entity).toBeInstanceOf(ProjectMeetingReport);
                expect(entity.id.value).toEqual(data.id.value);
                expect(entity.createUserId.value).toEqual(data.createUserId.value);
                expect(entity.reportDate.toString()).toEqual(data.reportDate.toString());
                expect(entity.projectId.value).toEqual(data.projectId.value);
                expect(entity.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(data.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(entity.title.value).toEqual(data.title.value);
                expect(entity.reportText.value).toEqual(data.reportText.value);
            }));
        });
    });
    describe('createProjectStatusUpdateReport', ()=>{
        it('should return ProjectStatusUpdateReport when input is valid', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectStatusUpdateReportProperty(), async (data)=>{
                fc.pre(!ids.includes(data.id.value));
                ids.push(data.id.value);
                const entity = await repository.createProjectStatusUpdateReport(data);
                assert.isNotNull(await prisma.project_report.findFirst({
                    where: {
                        project_report_id: data.id.value
                    }
                }));
                expect(entity).toBeInstanceOf(ProjectStatusUpdateReport);
                expect(entity.id.value).toEqual(data.id.value);
                expect(entity.createUserId.value).toEqual(data.createUserId.value);
                expect(entity.reportDate.toString()).toEqual(data.reportDate.toString());
                expect(entity.projectId.value).toEqual(data.projectId.value);
                expect(entity.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(data.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(entity.title.value).toEqual(data.title.value);
                expect(entity.reportText.value).toEqual(data.reportText.value);
                expect(entity.projectStatusCode.value).toEqual(data.projectStatusCode.value);
            }));
        });
    });
    describe('createProjectWorkerReport', ()=>{
        it('should return ProjectWorkerReport when input is valid', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectWorkerReportProperty(), async (data)=>{
                fc.pre(!ids.includes(data.id.value));
                ids.push(data.id.value);
                const entity = await repository.createProjectWorkerReport(data);
                assert.isNotNull(await prisma.project_report.findFirst({
                    where: {
                        project_report_id: data.id.value
                    }
                }));
                expect(entity).toBeInstanceOf(ProjectWorkerReport);
                expect(entity.id.value).toEqual(data.id.value);
                expect(entity.createUserId.value).toEqual(data.createUserId.value);
                expect(entity.reportDate.toString()).toEqual(data.reportDate.toString());
                expect(entity.projectId.value).toEqual(data.projectId.value);
                expect(entity.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(data.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(entity.title.value).toEqual(data.title.value);
                expect(entity.reportText.value).toEqual(data.reportText.value);
                expect(entity.reportTypeCode.value).toEqual(data.reportTypeCode.value);
                expect(entity.workerIds.map((id)=>id.value)).toEqual(expect.arrayContaining(data.workerIds.map((id)=>id.value)));
            }));
        });
    });
    describe('getProgressCheckReportById', ()=>{
        it('should return ProgressCheckReport when input is valid ID', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProgressCheckReportProperty(), async (data)=>{
                const report = await repository.createProgressCheckReport(data);
                expect(report).toBeInstanceOf(ProgressCheckReport);
                const entity = await repository.getProgressCheckReportById(report.id);
                expect(entity).toBeInstanceOf(ProgressCheckReport);
                expect(entity.id.value).toEqual(report.id.value);
                expect(entity.createUserId.value).toEqual(report.createUserId.value);
                expect(entity.reportDate.toString()).toEqual(report.reportDate.toString());
                expect(entity.projectId.value).toEqual(report.projectId.value);
                expect(entity.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(report.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(entity.title.value).toEqual(report.title.value);
                expect(entity.reportText.value).toEqual(report.reportText.value);
                expect(entity.executionBudgetUnitId.value).toEqual(report.executionBudgetUnitId.value);
                expect(entity.progressReportData.value).toEqual(report.progressReportData.value);
                expect(Number(entity.totalPerformancePercentage.toValue())).toEqual(Number(report.totalPerformancePercentage.toValue()));
                expect(Number(entity.consumedWorkersPercentage.toValue())).toEqual(Number(report.consumedWorkersPercentage.toValue()));
                expect(entity.workerIds.map((id)=>id.value)).toEqual(expect.arrayContaining(report.workerIds.map((id)=>id.value)));
            }), {
                numRuns: 1
            });
        });
        it('should throw error when input is invalid ID', async ()=>{
            await fc.assert(fc.asyncProperty(fc.uuid({
                version: 7
            }), async (id)=>{
                fc.pre(!await prisma.project_report.findFirst({
                    where: {
                        project_report_id: id
                    }
                }));
                const rejects = expect(repository.getProgressCheckReportById(ProjectReportId.from(id))).rejects;
                rejects.toBeInstanceOf(Error);
                rejects.toThrowError(/Report not found/);
            }), {
                numRuns: 1
            });
        });
    });
    describe('getProjectBudgetChangeById', ()=>{
        it('should return ProjectBudgetChange when input is valid ID', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectBudgetChangeProperty(), async (data)=>{
                const report = await repository.createProjectBudgetChange(data);
                expect(report).toBeInstanceOf(ProjectBudgetChange);
                const entity = await repository.getProjectBudgetChangeById(report.id);
                expect(entity).toBeInstanceOf(ProjectBudgetChange);
                expect(entity.id.value).toEqual(report.id.value);
                expect(entity.createUserId.value).toEqual(report.createUserId.value);
                expect(entity.reportDate.toString()).toEqual(report.reportDate.toString());
                expect(entity.projectId.value).toEqual(report.projectId.value);
                expect(entity.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(report.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(entity.title.value).toEqual(report.title.value);
                expect(entity.reportText.value).toEqual(report.reportText.value);
                expect(entity.changeReasonCode.value).toEqual(report.changeReasonCode.value);
                expect(entity.billingClientId.value).toEqual(report.billingClientId.value);
            }), {
                numRuns: 1
            });
        });
        it('should throw error when input is invalid ID', async ()=>{
            await fc.assert(fc.asyncProperty(fc.uuid({
                version: 7
            }), async (id)=>{
                fc.pre(!await prisma.project_report.findFirst({
                    where: {
                        project_report_id: id
                    }
                }));
                const rejects = expect(repository.getProjectBudgetChangeById(ProjectReportId.from(id))).rejects;
                rejects.toBeInstanceOf(Error);
                rejects.toThrowError(/Report not found/);
            }), {
                numRuns: 1
            });
        });
    });
    describe('getProjectCloseReportById', ()=>{
        it('should return ProjectCloseReport when input is valid ID', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectCloseReportProperty(), async (data)=>{
                const report = await repository.createProjectCloseReport(data);
                expect(report).toBeInstanceOf(ProjectCloseReport);
                const entity = await repository.getProjectCloseReportById(report.id);
                expect(entity).toBeInstanceOf(ProjectCloseReport);
                expect(entity.id.value).toEqual(report.id.value);
                expect(entity.createUserId.value).toEqual(report.createUserId.value);
                expect(entity.reportDate.toString()).toEqual(report.reportDate.toString());
                expect(entity.projectId.value).toEqual(report.projectId.value);
                expect(entity.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(report.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(entity.title.value).toEqual(report.title.value);
                expect(entity.reportText.value).toEqual(report.reportText.value);
                expect(entity.closeReportChecklist.value).toEqual(report.closeReportChecklist.value);
            }), {
                numRuns: 1
            });
        });
        it('should throw error when input is invalid ID', async ()=>{
            await fc.assert(fc.asyncProperty(fc.uuid({
                version: 7
            }), async (id)=>{
                fc.pre(!await prisma.project_report.findFirst({
                    where: {
                        project_report_id: id
                    }
                }));
                const rejects = expect(repository.getProjectCloseReportById(ProjectReportId.from(id))).rejects;
                rejects.toBeInstanceOf(Error);
                rejects.toThrowError(/Report not found/);
            }), {
                numRuns: 1
            });
        });
    });
    describe('getProjectCommonReportById', ()=>{
        it('should return ProjectCommonReport when input is valid ID', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectCommonReportProperty(), async (data)=>{
                const report = await repository.createProjectCommonReport(data);
                expect(report).toBeInstanceOf(ProjectCommonReport);
                const entity = await repository.getProjectCommonReportById(report.id);
                expect(entity).toBeInstanceOf(ProjectCommonReport);
                expect(entity.id.value).toEqual(report.id.value);
                expect(entity.createUserId.value).toEqual(report.createUserId.value);
                expect(entity.reportDate.toString()).toEqual(report.reportDate.toString());
                expect(entity.projectId.value).toEqual(report.projectId.value);
                expect(entity.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(report.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(entity.title.value).toEqual(report.title.value);
                expect(entity.reportText.value).toEqual(report.reportText.value);
            }), {
                numRuns: 1
            });
        });
        it('should throw error when input is invalid ID', async ()=>{
            await fc.assert(fc.asyncProperty(fc.uuid({
                version: 7
            }), async (id)=>{
                fc.pre(!await prisma.project_report.findFirst({
                    where: {
                        project_report_id: id
                    }
                }));
                const rejects = expect(repository.getProjectCommonReportById(ProjectReportId.from(id))).rejects;
                rejects.toBeInstanceOf(Error);
                rejects.toThrowError(/Report not found/);
            }), {
                numRuns: 1
            });
        });
    });
    describe('getProjectMeetingReportById', ()=>{
        it('should return ProjectMeetingReport when input is valid ID', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectMeetingReportProperty(), async (data)=>{
                const report = await repository.createProjectMeetingReport(data);
                expect(report).toBeInstanceOf(ProjectMeetingReport);
                const entity = await repository.getProjectMeetingReportById(report.id);
                expect(entity).toBeInstanceOf(ProjectMeetingReport);
                expect(entity.id.value).toEqual(report.id.value);
                expect(entity.createUserId.value).toEqual(report.createUserId.value);
                expect(entity.reportDate.toString()).toEqual(report.reportDate.toString());
                expect(entity.projectId.value).toEqual(report.projectId.value);
                expect(entity.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(report.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(entity.title.value).toEqual(report.title.value);
                expect(entity.reportText.value).toEqual(report.reportText.value);
            }), {
                numRuns: 1
            });
        });
        it('should throw error when input is invalid ID', async ()=>{
            await fc.assert(fc.asyncProperty(fc.uuid({
                version: 7
            }), async (id)=>{
                fc.pre(!await prisma.project_report.findFirst({
                    where: {
                        project_report_id: id
                    }
                }));
                const rejects = expect(repository.getProjectMeetingReportById(ProjectReportId.from(id))).rejects;
                rejects.toBeInstanceOf(Error);
                rejects.toThrowError(/Report not found/);
            }), {
                numRuns: 1
            });
        });
    });
    describe('getProjectStatusUpdateReportById', ()=>{
        it('should return ProjectStatusUpdateReport when input is valid ID', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectStatusUpdateReportProperty(), async (data)=>{
                const report = await repository.createProjectStatusUpdateReport(data);
                expect(report).toBeInstanceOf(ProjectStatusUpdateReport);
                const entity = await repository.getProjectStatusUpdateReportById(report.id);
                expect(entity).toBeInstanceOf(ProjectStatusUpdateReport);
                expect(entity.id.value).toEqual(report.id.value);
                expect(entity.createUserId.value).toEqual(report.createUserId.value);
                expect(entity.reportDate.toString()).toEqual(report.reportDate.toString());
                expect(entity.projectId.value).toEqual(report.projectId.value);
                expect(entity.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(report.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(entity.title.value).toEqual(report.title.value);
                expect(entity.reportText.value).toEqual(report.reportText.value);
                expect(entity.projectStatusCode.value).toEqual(report.projectStatusCode.value);
            }), {
                numRuns: 1
            });
        });
        it('should throw error when input is invalid ID', async ()=>{
            await fc.assert(fc.asyncProperty(fc.uuid({
                version: 7
            }), async (id)=>{
                fc.pre(!await prisma.project_report.findFirst({
                    where: {
                        project_report_id: id
                    }
                }));
                const rejects = expect(repository.getProjectStatusUpdateReportById(ProjectReportId.from(id))).rejects;
                rejects.toBeInstanceOf(Error);
                rejects.toThrowError(/Report not found/);
            }), {
                numRuns: 1
            });
        });
    });
    describe('getProjectWorkerReportById', ()=>{
        it('should return ProjectWorkerReport when input is valid ID', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectWorkerReportProperty(), async (data)=>{
                const report = await repository.createProjectWorkerReport(data);
                expect(report).toBeInstanceOf(ProjectWorkerReport);
                const entity = await repository.getProjectWorkerReportById(report.id);
                expect(entity).toBeInstanceOf(ProjectWorkerReport);
                expect(entity.id.value).toEqual(report.id.value);
                expect(entity.createUserId.value).toEqual(report.createUserId.value);
                expect(entity.reportDate.toString()).toEqual(report.reportDate.toString());
                expect(entity.projectId.value).toEqual(report.projectId.value);
                expect(entity.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(report.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(entity.title.value).toEqual(report.title.value);
                expect(entity.reportText.value).toEqual(report.reportText.value);
                expect(entity.reportTypeCode.value).toEqual(report.reportTypeCode?.value);
                expect(entity.workerIds.map((id)=>id.value)).toEqual(expect.arrayContaining(report.workerIds.map((id)=>id.value)));
            }), {
                numRuns: 1
            });
        });
        it('should throw error when input is invalid ID', async ()=>{
            await fc.assert(fc.asyncProperty(fc.uuid({
                version: 7
            }), async (id)=>{
                fc.pre(!await prisma.project_report.findFirst({
                    where: {
                        project_report_id: id
                    }
                }));
                const rejects = expect(repository.getProjectWorkerReportById(ProjectReportId.from(id))).rejects;
                rejects.toBeInstanceOf(Error);
                rejects.toThrowError(/Report not found/);
            }), {
                numRuns: 1
            });
        });
    });
    describe('updateProgressCheckReport', ()=>{
        it('should return ProgressCheckReport when input is valid', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProgressCheckReportProperty(), makeUpdateProgressCheckReportProperty(), async (createData, updateData)=>{
                fc.pre(!ids.includes(createData.id.value));
                ids.push(createData.id.value);
                const report = await repository.createProgressCheckReport(createData);
                expect(report).toBeInstanceOf(ProgressCheckReport);
                const update = report.update(updateData);
                const updatedReport = await repository.updateProgressCheckReport(update);
                expect(updatedReport).toBeInstanceOf(ProgressCheckReport);
                expect(updatedReport.id.value).toEqual(report.id.value);
                expect(updatedReport.createUserId.value).toEqual(updateData.createUserId?.value ?? report.createUserId.value);
                expect(updatedReport.reportDate.toString()).toEqual(updateData.reportDate?.toString() ?? report.reportDate.toString());
                expect(updatedReport.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining((updateData.files ?? report.files).map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(updatedReport.title.value).toEqual(updateData.title?.value ?? report.title.value);
                expect(updatedReport.reportText.value).toEqual(updateData.reportText?.value ?? report.reportText.value);
                expect(updatedReport.executionBudgetUnitId.value).toEqual(updateData.executionBudgetUnitId?.value ?? report.executionBudgetUnitId.value);
                expect(updatedReport.progressReportData.value).toEqual(updateData.progressReportData?.value ?? report.progressReportData.value);
                expect(Number(updatedReport.totalPerformancePercentage.toValue())).toEqual(Number(updateData.totalPerformancePercentage?.toValue() ?? report.totalPerformancePercentage.toValue()));
                expect(Number(updatedReport.consumedWorkersPercentage.toValue())).toEqual(Number(updateData.consumedWorkersPercentage?.toValue() ?? report.consumedWorkersPercentage.toValue()));
                expect(updatedReport.workerIds.map((id)=>id.value)).toEqual(expect.arrayContaining((updateData?.workerIds ?? report.workerIds).map((id)=>id.value)));
            }));
        });
        it('should return correct files when there are multiple records in the form_attached_files table', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProgressCheckReportProperty().filter((val)=>val.files.length > 1), makeCreateProgressCheckReportProperty().filter((val)=>val.files.length > 1), makeFilesProperty(), async (createData1, createData2, files)=>{
                fc.pre(!ids.includes(createData1.id.value));
                fc.pre(!ids.includes(createData2.id.value));
                ids.push(createData1.id.value);
                ids.push(createData2.id.value);
                const createdReport1 = await repository.createProgressCheckReport(createData1);
                const createdReport2 = await repository.createProgressCheckReport(createData2);
                const fileEntities = files.map((file)=>new File({
                        name: file.name,
                        path: file.path,
                        uploadUserId: UploadUserId.from(createdReport1.id.value)
                    }));
                const report1 = await repository.updateProgressCheckReport(createdReport1.update({
                    files: fileEntities
                }));
                const report2 = await repository.getProgressCheckReportById(createdReport2.id);
                expect(report1).toBeInstanceOf(ProgressCheckReport);
                expect(report2).toBeInstanceOf(ProgressCheckReport);
                expect(report1.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(fileEntities.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(report2.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(createdReport2.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
            }));
        });
    });
    describe('updateProjectBudgetChange', ()=>{
        it('should return ProjectBudgetChange when input is valid', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectBudgetChangeProperty(), makeUpdateProjectBudgetChangeProperty(), async (createData, updateData)=>{
                fc.pre(!ids.includes(createData.id.value));
                ids.push(createData.id.value);
                const report = await repository.createProjectBudgetChange(createData);
                expect(report).toBeInstanceOf(ProjectBudgetChange);
                const update = report.update(updateData);
                const updatedReport = await repository.updateProjectBudgetChange(update);
                expect(updatedReport).toBeInstanceOf(ProjectBudgetChange);
                expect(updatedReport.id.value).toEqual(report.id.value);
                expect(updatedReport.createUserId.value).toEqual(updateData.createUserId?.value ?? report.createUserId.value);
                expect(updatedReport.reportDate.toString()).toEqual(updateData.reportDate?.toString() ?? report.reportDate.toString());
                expect(updatedReport.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining((updateData.files ?? report.files).map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(updatedReport.title.value).toEqual(updateData.title?.value ?? report.title.value);
                expect(updatedReport.reportText.value).toEqual(updateData.reportText?.value ?? report.reportText.value);
                expect(updatedReport.changeReasonCode.value).toEqual(updateData.changeReasonCode?.value ?? report.changeReasonCode.value);
                expect(updatedReport.billingClientId.value).toEqual(updateData.billingClientId?.value ?? report.billingClientId.value);
            }));
        });
        it('should return correct files when there are multiple records in the form_attached_files table', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectBudgetChangeProperty().filter((val)=>val.files.length > 1), makeCreateProjectBudgetChangeProperty().filter((val)=>val.files.length > 1), makeFilesProperty(), async (createData1, createData2, files)=>{
                fc.pre(!ids.includes(createData1.id.value));
                fc.pre(!ids.includes(createData2.id.value));
                ids.push(createData1.id.value);
                ids.push(createData2.id.value);
                const createdReport1 = await repository.createProjectBudgetChange(createData1);
                const createdReport2 = await repository.createProjectBudgetChange(createData2);
                const fileEntities = files.map((file)=>new File({
                        name: file.name,
                        path: file.path,
                        uploadUserId: UploadUserId.from(createdReport1.id.value)
                    }));
                const report1 = await repository.updateProjectBudgetChange(createdReport1.update({
                    files: fileEntities
                }));
                const report2 = await repository.getProjectBudgetChangeById(createdReport2.id);
                expect(report1).toBeInstanceOf(ProjectBudgetChange);
                expect(report2).toBeInstanceOf(ProjectBudgetChange);
                expect(report1.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(fileEntities.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(report2.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(createdReport2.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
            }));
        });
    });
    describe('updateProjectCloseReport', ()=>{
        it('should return ProjectCloseReport when input is valid', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectCloseReportProperty(), makeUpdateProjectCloseReportProperty(), async (createData, updateData)=>{
                fc.pre(!ids.includes(createData.id.value));
                ids.push(createData.id.value);
                const report = await repository.createProjectCloseReport(createData);
                expect(report).toBeInstanceOf(ProjectCloseReport);
                const update = report.update(updateData);
                const updatedReport = await repository.updateProjectCloseReport(update);
                expect(updatedReport).toBeInstanceOf(ProjectCloseReport);
                expect(updatedReport.id.value).toEqual(report.id.value);
                expect(updatedReport.createUserId.value).toEqual(updateData.createUserId?.value ?? report.createUserId.value);
                expect(updatedReport.reportDate.toString()).toEqual(updateData.reportDate?.toString() ?? report.reportDate.toString());
                expect(updatedReport.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining((updateData.files ?? report.files).map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(updatedReport.title.value).toEqual(updateData.title?.value ?? report.title.value);
                expect(updatedReport.reportText.value).toEqual(updateData.reportText?.value ?? report.reportText.value);
                expect(updatedReport.closeReportChecklist.value).toEqual(updateData.closeReportChecklist?.value ?? report.closeReportChecklist.value);
            }));
        });
        it('should return correct files when there are multiple records in the form_attached_files table', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectCloseReportProperty().filter((val)=>val.files.length > 1), makeCreateProjectCloseReportProperty().filter((val)=>val.files.length > 1), makeFilesProperty(), async (createData1, createData2, files)=>{
                fc.pre(!ids.includes(createData1.id.value));
                fc.pre(!ids.includes(createData2.id.value));
                ids.push(createData1.id.value);
                ids.push(createData2.id.value);
                const createdReport1 = await repository.createProjectCloseReport(createData1);
                const createdReport2 = await repository.createProjectCloseReport(createData2);
                const fileEntities = files.map((file)=>new File({
                        name: file.name,
                        path: file.path,
                        uploadUserId: UploadUserId.from(createdReport1.id.value)
                    }));
                const report1 = await repository.updateProjectCloseReport(createdReport1.update({
                    files: fileEntities
                }));
                const report2 = await repository.getProjectCloseReportById(createdReport2.id);
                expect(report1).toBeInstanceOf(ProjectCloseReport);
                expect(report2).toBeInstanceOf(ProjectCloseReport);
                expect(report1.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(fileEntities.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(report2.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(createdReport2.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
            }));
        });
    });
    describe('updateProjectCommonReport', ()=>{
        it('should return ProjectCommonReport when input is valid', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectCommonReportProperty(), makeUpdateProjectCommonReportProperty(), async (createData, updateData)=>{
                fc.pre(!ids.includes(createData.id.value));
                ids.push(createData.id.value);
                const report = await repository.createProjectCommonReport(createData);
                expect(report).toBeInstanceOf(ProjectCommonReport);
                const update = report.update(updateData);
                const updatedReport = await repository.updateProjectCommonReport(update);
                expect(updatedReport).toBeInstanceOf(ProjectCommonReport);
                expect(updatedReport.id.value).toEqual(report.id.value);
                expect(updatedReport.createUserId.value).toEqual(updateData.createUserId?.value ?? report.createUserId.value);
                expect(updatedReport.reportDate.toString()).toEqual(updateData.reportDate?.toString() ?? report.reportDate.toString());
                expect(updatedReport.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining((updateData.files ?? report.files).map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(updatedReport.title.value).toEqual(updateData.title?.value ?? report.title.value);
                expect(updatedReport.reportText.value).toEqual(updateData.reportText?.value ?? report.reportText.value);
            }));
        });
        it('should return correct files when there are multiple records in the form_attached_files table', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectCommonReportProperty().filter((val)=>val.files.length > 1), makeCreateProjectCommonReportProperty().filter((val)=>val.files.length > 1), makeFilesProperty(), async (createData1, createData2, files)=>{
                fc.pre(!ids.includes(createData1.id.value));
                fc.pre(!ids.includes(createData2.id.value));
                ids.push(createData1.id.value);
                ids.push(createData2.id.value);
                const createdReport1 = await repository.createProjectCommonReport(createData1);
                const createdReport2 = await repository.createProjectCommonReport(createData2);
                const fileEntities = files.map((file)=>new File({
                        name: file.name,
                        path: file.path,
                        uploadUserId: UploadUserId.from(createdReport1.id.value)
                    }));
                const report1 = await repository.updateProjectCommonReport(createdReport1.update({
                    files: fileEntities
                }));
                const report2 = await repository.getProjectCommonReportById(createdReport2.id);
                expect(report1).toBeInstanceOf(ProjectCommonReport);
                expect(report2).toBeInstanceOf(ProjectCommonReport);
                expect(report1.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(fileEntities.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(report2.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(createdReport2.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
            }));
        });
    });
    describe('updateProjectMeetingReport', ()=>{
        it('should return ProjectMeetingReport when input is valid', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectMeetingReportProperty(), makeUpdateProjectMeetingReportProperty(), async (createData, updateData)=>{
                fc.pre(!ids.includes(createData.id.value));
                ids.push(createData.id.value);
                const report = await repository.createProjectMeetingReport(createData);
                expect(report).toBeInstanceOf(ProjectMeetingReport);
                const update = report.update(updateData);
                const updatedReport = await repository.updateProjectMeetingReport(update);
                expect(updatedReport).toBeInstanceOf(ProjectMeetingReport);
                expect(updatedReport.id.value).toEqual(report.id.value);
                expect(updatedReport.createUserId.value).toEqual(updateData.createUserId?.value ?? report.createUserId.value);
                expect(updatedReport.reportDate.toString()).toEqual(updateData.reportDate?.toString() ?? report.reportDate.toString());
                expect(updatedReport.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining((updateData.files ?? report.files).map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(updatedReport.title.value).toEqual(updateData.title?.value ?? report.title.value);
                expect(updatedReport.reportText.value).toEqual(updateData.reportText?.value ?? report.reportText.value);
            }));
        });
        it('should return correct files when there are multiple records in the form_attached_files table', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectMeetingReportProperty().filter((val)=>val.files.length > 1), makeCreateProjectMeetingReportProperty().filter((val)=>val.files.length > 1), makeFilesProperty(), async (createData1, createData2, files)=>{
                fc.pre(!ids.includes(createData1.id.value));
                fc.pre(!ids.includes(createData2.id.value));
                ids.push(createData1.id.value);
                ids.push(createData2.id.value);
                const createdReport1 = await repository.createProjectMeetingReport(createData1);
                const createdReport2 = await repository.createProjectMeetingReport(createData2);
                const fileEntities = files.map((file)=>new File({
                        name: file.name,
                        path: file.path,
                        uploadUserId: UploadUserId.from(createdReport1.id.value)
                    }));
                const report1 = await repository.updateProjectMeetingReport(createdReport1.update({
                    files: fileEntities
                }));
                const report2 = await repository.getProjectMeetingReportById(createdReport2.id);
                expect(report1).toBeInstanceOf(ProjectMeetingReport);
                expect(report2).toBeInstanceOf(ProjectMeetingReport);
                expect(report1.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(fileEntities.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(report2.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(createdReport2.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
            }));
        });
    });
    describe('updateProjectStatusUpdateReport', ()=>{
        it('should return ProjectStatusUpdateReport when input is valid', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectStatusUpdateReportProperty(), makeUpdateProjectStatusUpdateReportProperty(), async (createData, updateData)=>{
                fc.pre(!ids.includes(createData.id.value));
                ids.push(createData.id.value);
                const report = await repository.createProjectStatusUpdateReport(createData);
                expect(report).toBeInstanceOf(ProjectStatusUpdateReport);
                const update = report.update(updateData);
                const updatedReport = await repository.updateProjectStatusUpdateReport(update);
                expect(updatedReport).toBeInstanceOf(ProjectStatusUpdateReport);
                expect(updatedReport.id.value).toEqual(report.id.value);
                expect(updatedReport.createUserId.value).toEqual(updateData.createUserId?.value ?? report.createUserId.value);
                expect(updatedReport.reportDate.toString()).toEqual(updateData.reportDate?.toString() ?? report.reportDate.toString());
                expect(updatedReport.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining((updateData.files ?? report.files).map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(updatedReport.title.value).toEqual(updateData.title?.value ?? report.title.value);
                expect(updatedReport.reportText.value).toEqual(updateData.reportText?.value ?? report.reportText.value);
                expect(updatedReport.projectStatusCode.value).toEqual(updateData.projectStatusCode?.value ?? report.projectStatusCode.value);
            }));
        });
        it('should return correct files when there are multiple records in the form_attached_files table', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectStatusUpdateReportProperty().filter((val)=>val.files.length > 1), makeCreateProjectStatusUpdateReportProperty().filter((val)=>val.files.length > 1), makeFilesProperty(), async (createData1, createData2, files)=>{
                fc.pre(!ids.includes(createData1.id.value));
                fc.pre(!ids.includes(createData2.id.value));
                ids.push(createData1.id.value);
                ids.push(createData2.id.value);
                const createdReport1 = await repository.createProjectStatusUpdateReport(createData1);
                const createdReport2 = await repository.createProjectStatusUpdateReport(createData2);
                const fileEntities = files.map((file)=>new File({
                        name: file.name,
                        path: file.path,
                        uploadUserId: UploadUserId.from(createdReport1.id.value)
                    }));
                const report1 = await repository.updateProjectStatusUpdateReport(createdReport1.update({
                    files: fileEntities
                }));
                const report2 = await repository.getProjectStatusUpdateReportById(createdReport2.id);
                expect(report1).toBeInstanceOf(ProjectStatusUpdateReport);
                expect(report2).toBeInstanceOf(ProjectStatusUpdateReport);
                expect(report1.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(fileEntities.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(report2.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(createdReport2.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
            }));
        });
    });
    describe('updateProjectWorkerReport', ()=>{
        it('should return ProjectWorkerReport when input is valid', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectWorkerReportProperty(), makeUpdateProjectWorkerReportProperty(), async (createData, updateData)=>{
                fc.pre(!ids.includes(createData.id.value));
                ids.push(createData.id.value);
                const report = await repository.createProjectWorkerReport(createData);
                expect(report).toBeInstanceOf(ProjectWorkerReport);
                const update = report.update(updateData);
                const updatedReport = await repository.updateProjectWorkerReport(update);
                expect(updatedReport).toBeInstanceOf(ProjectWorkerReport);
                expect(updatedReport.id.value).toEqual(report.id.value);
                expect(updatedReport.createUserId.value).toEqual(updateData.createUserId?.value ?? report.createUserId.value);
                expect(updatedReport.reportDate.toString()).toEqual(updateData.reportDate?.toString() ?? report.reportDate.toString());
                expect(updatedReport.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining((updateData.files ?? report.files).map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(updatedReport.title.value).toEqual(updateData.title?.value ?? report.title.value);
                expect(updatedReport.reportText.value).toEqual(updateData.reportText?.value ?? report.reportText.value);
                expect(updatedReport.reportTypeCode.value).toEqual(updateData.reportTypeCode?.value ?? report.reportTypeCode.value);
                expect(updatedReport.workerIds.map((id)=>id.value)).toEqual(expect.arrayContaining((updateData.workerIds ?? report.workerIds).map((id)=>id.value)));
            }));
        });
        it('should return correct files when there are multiple records in the form_attached_files table', async ()=>{
            await fc.assert(fc.asyncProperty(makeCreateProjectStatusUpdateReportProperty().filter((val)=>val.files.length > 1), makeCreateProjectStatusUpdateReportProperty().filter((val)=>val.files.length > 1), makeFilesProperty(), async (createData1, createData2, files)=>{
                fc.pre(!ids.includes(createData1.id.value));
                fc.pre(!ids.includes(createData2.id.value));
                ids.push(createData1.id.value);
                ids.push(createData2.id.value);
                const createdReport1 = await repository.createProjectStatusUpdateReport(createData1);
                const createdReport2 = await repository.createProjectStatusUpdateReport(createData2);
                const fileEntities = files.map((file)=>new File({
                        name: file.name,
                        path: file.path,
                        uploadUserId: UploadUserId.from(createdReport1.id.value)
                    }));
                const report1 = await repository.updateProjectStatusUpdateReport(createdReport1.update({
                    files: fileEntities
                }));
                const report2 = await repository.getProjectStatusUpdateReportById(createdReport2.id);
                expect(report1).toBeInstanceOf(ProjectStatusUpdateReport);
                expect(report2).toBeInstanceOf(ProjectStatusUpdateReport);
                expect(report1.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(fileEntities.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
                expect(report2.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))).toEqual(expect.arrayContaining(createdReport2.files.map((item)=>({
                        name: item.name.value,
                        path: item.path.value,
                        uploadUserId: item.uploadUserId.value
                    }))));
            }));
        });
    });
});

//# sourceMappingURL=report.repository.spec.js.map