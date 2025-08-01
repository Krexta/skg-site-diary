function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { FileId, ProgressCheckReportedWorkerId, ProgressCheckReportId, ProjectBudgetChangeId, ProjectCloseReportId, ProjectCommonReportId, ProjectMeetingReportId, ProjectStatusUpdateReportId, ProjectWorkerReportId, ReportedWorkerId } from "../../../domain/value/index.js";
import { CustomLogger } from "../../../utility/index.js";
import { PrismaService } from "../../service/index.js";
import { ReportParser } from "./parser.js";
export class ReportTable {
    async createProgressCheckReport(report) {
        const result = await this.prisma.handleError(()=>{
            return this.prisma.project_report.create({
                data: {
                    project_report_id: report.id.value,
                    create_user_id: report.createUserId.value,
                    report_date: report.reportDate.toDate(),
                    project_id: report.projectId.value,
                    form_attached_files: {
                        createMany: {
                            data: report.files.map((file)=>({
                                    form_attached_file_id: FileId.make().value,
                                    file_name: file.name.value,
                                    file_path: file.path.value,
                                    upload_user_id: file.uploadUserId.value
                                }))
                        }
                    },
                    progress_check_report: {
                        create: {
                            progress_check_report_id: ProgressCheckReportId.make().value,
                            execution_budget_unit_id: report.executionBudgetUnitId.value,
                            progress_report_data: report.progressReportData.value,
                            total_performance_percentage: new Prisma.Decimal(report.totalPerformancePercentage.toValue()),
                            consumed_workers_percentage: new Prisma.Decimal(report.consumedWorkersPercentage.toValue()),
                            title: report.title.value,
                            report_text: report.reportText.value,
                            progress_check_reported_worker: {
                                createMany: {
                                    data: report.workerIds.map((id)=>({
                                            progress_check_reported_worker_id: ProgressCheckReportedWorkerId.make().value,
                                            worker_id: id.value
                                        })),
                                    skipDuplicates: true
                                }
                            }
                        }
                    }
                },
                include: this.reportInclude
            });
        });
        return this.parser.convertToProgressCheckReportEntity(result);
    }
    async createProjectBudgetChange(report) {
        const result = await this.prisma.handleError(()=>{
            return this.prisma.project_report.create({
                data: {
                    project_report_id: report.id.value,
                    create_user_id: report.createUserId.value,
                    report_date: report.reportDate.toDate(),
                    project_id: report.projectId.value,
                    form_attached_files: {
                        createMany: {
                            data: report.files.map((file)=>({
                                    form_attached_file_id: FileId.make().value,
                                    file_name: file.name.value,
                                    file_path: file.path.value,
                                    upload_user_id: file.uploadUserId.value
                                }))
                        }
                    },
                    project_budget_change: {
                        create: {
                            project_budget_id: ProjectBudgetChangeId.make().value,
                            change_reason_code: report.changeReasonCode.value,
                            billing_client_id: report.billingClientId.value,
                            title: report.title.value,
                            report_text: report.reportText.value
                        }
                    }
                },
                include: this.reportInclude
            });
        });
        return this.parser.convertToProjectBudgetChangeEntity(result);
    }
    async createProjectCloseReport(report) {
        const result = await this.prisma.handleError(()=>{
            return this.prisma.project_report.create({
                data: {
                    project_report_id: report.id.value,
                    create_user_id: report.createUserId.value,
                    report_date: report.reportDate.toDate(),
                    project_id: report.projectId.value,
                    form_attached_files: {
                        createMany: {
                            data: report.files.map((file)=>({
                                    form_attached_file_id: FileId.make().value,
                                    file_name: file.name.value,
                                    file_path: file.path.value,
                                    upload_user_id: file.uploadUserId.value
                                }))
                        }
                    },
                    project_close_report: {
                        create: {
                            project_close_report_id: ProjectCloseReportId.make().value,
                            close_report_checklist: report.closeReportChecklist.value,
                            title: report.title.value,
                            report_text: report.reportText.value
                        }
                    }
                },
                include: this.reportInclude
            });
        });
        return this.parser.convertToProjectCloseReportEntity(result);
    }
    async createProjectCommonReport(report) {
        const result = await this.prisma.handleError(()=>{
            return this.prisma.project_report.create({
                data: {
                    project_report_id: report.id.value,
                    create_user_id: report.createUserId.value,
                    report_date: report.reportDate.toDate(),
                    project_id: report.projectId.value,
                    form_attached_files: {
                        createMany: {
                            data: report.files.map((file)=>({
                                    form_attached_file_id: FileId.make().value,
                                    file_name: file.name.value,
                                    file_path: file.path.value,
                                    upload_user_id: file.uploadUserId.value
                                }))
                        }
                    },
                    project_common_report: {
                        create: {
                            project_common_report_id: ProjectCommonReportId.make().value,
                            title: report.title.value,
                            report_text: report.reportText.value
                        }
                    }
                },
                include: this.reportInclude
            });
        });
        return this.parser.convertToProjectCommonReportEntity(result);
    }
    async createProjectMeetingReport(report) {
        const result = await this.prisma.handleError(()=>{
            return this.prisma.project_report.create({
                data: {
                    project_report_id: report.id.value,
                    create_user_id: report.createUserId.value,
                    report_date: report.reportDate.toDate(),
                    project_id: report.projectId.value,
                    form_attached_files: {
                        createMany: {
                            data: report.files.map((file)=>({
                                    form_attached_file_id: FileId.make().value,
                                    file_name: file.name.value,
                                    file_path: file.path.value,
                                    upload_user_id: file.uploadUserId.value
                                }))
                        }
                    },
                    project_meeting_report: {
                        create: {
                            project_meeting_report_id: ProjectMeetingReportId.make().value,
                            title: report.title.value,
                            report_text: report.reportText.value
                        }
                    }
                },
                include: this.reportInclude
            });
        });
        return this.parser.convertToProjectMeetingReportEntity(result);
    }
    async createProjectStatusUpdateReport(report) {
        const result = await this.prisma.handleError(()=>{
            return this.prisma.project_report.create({
                data: {
                    project_report_id: report.id.value,
                    create_user_id: report.createUserId.value,
                    report_date: report.reportDate.toDate(),
                    project_id: report.projectId.value,
                    form_attached_files: {
                        createMany: {
                            data: report.files.map((file)=>({
                                    form_attached_file_id: FileId.make().value,
                                    file_name: file.name.value,
                                    file_path: file.path.value,
                                    upload_user_id: file.uploadUserId.value
                                }))
                        }
                    },
                    project_status_update_report: {
                        create: {
                            project_status_update_report_id: ProjectStatusUpdateReportId.make().value,
                            title: report.title.value,
                            report_text: report.reportText.value,
                            project_status_code: report.projectStatusCode.value
                        }
                    }
                },
                include: this.reportInclude
            });
        });
        return this.parser.convertToProjectStatusUpdateReportEntity(result);
    }
    async createProjectWorkerReport(report) {
        const result = await this.prisma.handleError(()=>{
            return this.prisma.project_report.create({
                data: {
                    project_report_id: report.id.value,
                    create_user_id: report.createUserId.value,
                    report_date: report.reportDate.toDate(),
                    project_id: report.projectId.value,
                    form_attached_files: {
                        createMany: {
                            data: report.files.map((file)=>({
                                    form_attached_file_id: FileId.make().value,
                                    file_name: file.name.value,
                                    file_path: file.path.value,
                                    upload_user_id: file.uploadUserId.value
                                }))
                        }
                    },
                    project_worker_report: {
                        create: {
                            project_worker_report_id: ProjectWorkerReportId.make().value,
                            title: report.title.value,
                            report_text: report.reportText.value,
                            report_type_code: report.reportTypeCode.value,
                            reported_workers: {
                                createMany: {
                                    data: report.workerIds.map((id)=>({
                                            reported_workers_id: ReportedWorkerId.make().value,
                                            worker_id: id.value
                                        })),
                                    skipDuplicates: true
                                }
                            }
                        }
                    }
                },
                include: this.reportInclude
            });
        });
        return this.parser.convertToProjectWorkerReportEntity(result);
    }
    async updateProgressCheckReport(updateReport) {
        const result = await this.prisma.handleError(()=>{
            return this.prisma.project_report.update({
                where: {
                    project_report_id: updateReport.id.value
                },
                data: {
                    create_user_id: updateReport.createUserId?.value,
                    report_date: updateReport.reportDate?.toDate(),
                    form_attached_files: updateReport.files ? {
                        deleteMany: {},
                        createMany: {
                            data: updateReport.files?.map((file)=>({
                                    form_attached_file_id: FileId.make().value,
                                    file_name: file.name.value,
                                    file_path: file.path.value,
                                    upload_user_id: file.uploadUserId.value
                                }))
                        }
                    } : undefined,
                    progress_check_report: {
                        update: {
                            data: {
                                execution_budget_unit_id: updateReport?.executionBudgetUnitId?.value,
                                progress_report_data: updateReport?.progressReportData?.value,
                                total_performance_percentage: updateReport?.totalPerformancePercentage ? new Prisma.Decimal(updateReport.totalPerformancePercentage.toValue()) : undefined,
                                consumed_workers_percentage: updateReport?.consumedWorkersPercentage ? new Prisma.Decimal(updateReport.consumedWorkersPercentage.toValue()) : undefined,
                                title: updateReport?.title?.value,
                                report_text: updateReport?.reportText?.value,
                                progress_check_reported_worker: updateReport?.workerIds ? {
                                    deleteMany: {},
                                    createMany: {
                                        data: updateReport.workerIds.map((id)=>({
                                                progress_check_reported_worker_id: ProgressCheckReportedWorkerId.make().value,
                                                worker_id: id.value
                                            })),
                                        skipDuplicates: true
                                    }
                                } : undefined
                            }
                        }
                    }
                },
                include: this.reportInclude
            });
        });
        return this.parser.convertToProgressCheckReportEntity(result);
    }
    async updateProjectBudgetChange(updateReport) {
        const result = await this.prisma.handleError(()=>{
            return this.prisma.project_report.update({
                where: {
                    project_report_id: updateReport.id.value
                },
                data: {
                    create_user_id: updateReport.createUserId?.value,
                    report_date: updateReport.reportDate?.toDate(),
                    form_attached_files: updateReport.files ? {
                        deleteMany: {},
                        createMany: {
                            data: updateReport.files.map((file)=>({
                                    form_attached_file_id: FileId.make().value,
                                    file_name: file.name.value,
                                    file_path: file.path.value,
                                    upload_user_id: file.uploadUserId.value
                                }))
                        }
                    } : undefined,
                    project_budget_change: {
                        update: {
                            data: {
                                change_reason_code: updateReport?.changeReasonCode?.value,
                                billing_client_id: updateReport?.billingClientId?.value,
                                title: updateReport?.title?.value,
                                report_text: updateReport?.reportText?.value
                            }
                        }
                    }
                },
                include: this.reportInclude
            });
        });
        return this.parser.convertToProjectBudgetChangeEntity(result);
    }
    async updateProjectCloseReport(updateReport) {
        const result = await this.prisma.handleError(()=>{
            return this.prisma.project_report.update({
                where: {
                    project_report_id: updateReport.id.value
                },
                data: {
                    create_user_id: updateReport.createUserId?.value,
                    report_date: updateReport.reportDate?.toDate(),
                    form_attached_files: updateReport.files ? {
                        deleteMany: {},
                        createMany: {
                            data: updateReport.files?.map((file)=>({
                                    form_attached_file_id: FileId.make().value,
                                    file_name: file.name.value,
                                    file_path: file.path.value,
                                    upload_user_id: file.uploadUserId.value
                                }))
                        }
                    } : undefined,
                    project_close_report: {
                        update: {
                            data: {
                                close_report_checklist: updateReport?.closeReportChecklist?.value,
                                title: updateReport?.title?.value,
                                report_text: updateReport?.reportText?.value
                            }
                        }
                    }
                },
                include: this.reportInclude
            });
        });
        return this.parser.convertToProjectCloseReportEntity(result);
    }
    async updateProjectCommonReport(updateReport) {
        const result = await this.prisma.handleError(()=>{
            return this.prisma.project_report.update({
                where: {
                    project_report_id: updateReport.id.value
                },
                data: {
                    create_user_id: updateReport.createUserId?.value,
                    report_date: updateReport.reportDate?.toDate(),
                    form_attached_files: updateReport.files ? {
                        deleteMany: {},
                        createMany: {
                            data: updateReport.files?.map((file)=>({
                                    form_attached_file_id: FileId.make().value,
                                    file_name: file.name.value,
                                    file_path: file.path.value,
                                    upload_user_id: file.uploadUserId.value
                                }))
                        }
                    } : undefined,
                    project_common_report: {
                        update: {
                            data: {
                                title: updateReport?.title?.value,
                                report_text: updateReport?.reportText?.value
                            }
                        }
                    }
                },
                include: this.reportInclude
            });
        });
        return this.parser.convertToProjectCommonReportEntity(result);
    }
    async updateProjectMeetingReport(updateReport) {
        const result = await this.prisma.handleError(()=>{
            return this.prisma.project_report.update({
                where: {
                    project_report_id: updateReport.id.value
                },
                data: {
                    create_user_id: updateReport.createUserId?.value,
                    report_date: updateReport.reportDate?.toDate(),
                    form_attached_files: updateReport.files ? {
                        deleteMany: {},
                        createMany: {
                            data: updateReport.files?.map((file)=>({
                                    form_attached_file_id: FileId.make().value,
                                    file_name: file.name.value,
                                    file_path: file.path.value,
                                    upload_user_id: file.uploadUserId.value
                                }))
                        }
                    } : undefined,
                    project_meeting_report: {
                        update: {
                            data: {
                                title: updateReport?.title?.value,
                                report_text: updateReport?.reportText?.value
                            }
                        }
                    }
                },
                include: this.reportInclude
            });
        });
        return this.parser.convertToProjectMeetingReportEntity(result);
    }
    async updateProjectStatusUpdateReport(updateReport) {
        const result = await this.prisma.handleError(()=>{
            return this.prisma.project_report.update({
                where: {
                    project_report_id: updateReport.id.value
                },
                data: {
                    create_user_id: updateReport.createUserId?.value,
                    report_date: updateReport.reportDate?.toDate(),
                    form_attached_files: updateReport.files ? {
                        deleteMany: {},
                        createMany: {
                            data: updateReport.files?.map((file)=>({
                                    form_attached_file_id: FileId.make().value,
                                    file_name: file.name.value,
                                    file_path: file.path.value,
                                    upload_user_id: file.uploadUserId.value
                                }))
                        }
                    } : undefined,
                    project_status_update_report: {
                        update: {
                            data: {
                                title: updateReport?.title?.value,
                                report_text: updateReport?.reportText?.value,
                                project_status_code: updateReport?.projectStatusCode?.value
                            }
                        }
                    }
                },
                include: this.reportInclude
            });
        });
        return this.parser.convertToProjectStatusUpdateReportEntity(result);
    }
    async updateProjectWorkerReport(updateReport) {
        const result = await this.prisma.handleError(()=>{
            return this.prisma.project_report.update({
                where: {
                    project_report_id: updateReport.id.value
                },
                data: {
                    create_user_id: updateReport.createUserId?.value,
                    report_date: updateReport.reportDate?.toDate(),
                    form_attached_files: updateReport.files ? {
                        deleteMany: {},
                        createMany: {
                            data: updateReport.files?.map((file)=>({
                                    form_attached_file_id: FileId.make().value,
                                    file_name: file.name.value,
                                    file_path: file.path.value,
                                    upload_user_id: file.uploadUserId.value
                                }))
                        }
                    } : undefined,
                    project_worker_report: {
                        update: {
                            data: {
                                title: updateReport?.title?.value,
                                report_text: updateReport?.reportText?.value,
                                report_type_code: updateReport?.reportTypeCode?.value,
                                reported_workers: updateReport?.workerIds ? {
                                    deleteMany: {},
                                    createMany: {
                                        data: updateReport.workerIds.map((id)=>({
                                                reported_workers_id: ReportedWorkerId.make().value,
                                                worker_id: id.value
                                            })),
                                        skipDuplicates: true
                                    }
                                } : undefined
                            }
                        }
                    }
                },
                include: this.reportInclude
            });
        });
        return this.parser.convertToProjectWorkerReportEntity(result);
    }
    async getProgressCheckReportById(id) {
        const result = await this.prisma.handleError(()=>{
            return this.prisma.project_report.findFirst({
                where: {
                    project_report_id: id.value
                },
                include: this.reportInclude
            });
        });
        if (!result || !result.progress_check_report) {
            throw new NotFoundException('Report not found');
        }
        return this.parser.convertToProgressCheckReportEntity(result);
    }
    async getProjectBudgetChangeById(id) {
        const result = await this.prisma.handleError(()=>{
            return this.prisma.project_report.findFirst({
                where: {
                    project_report_id: id.value
                },
                include: this.reportInclude
            });
        });
        if (!result || !result.project_budget_change) {
            throw new NotFoundException('Report not found');
        }
        return this.parser.convertToProjectBudgetChangeEntity(result);
    }
    async getProjectCloseReportById(id) {
        const result = await this.prisma.handleError(()=>{
            return this.prisma.project_report.findFirst({
                where: {
                    project_report_id: id.value
                },
                include: this.reportInclude
            });
        });
        if (!result || !result.project_close_report) {
            throw new NotFoundException('Report not found');
        }
        return this.parser.convertToProjectCloseReportEntity(result);
    }
    async getProjectCommonReportById(id) {
        const result = await this.prisma.handleError(()=>{
            return this.prisma.project_report.findFirst({
                where: {
                    project_report_id: id.value
                },
                include: this.reportInclude
            });
        });
        if (!result || !result.project_common_report) {
            throw new NotFoundException('Report not found');
        }
        return this.parser.convertToProjectCommonReportEntity(result);
    }
    async getProjectMeetingReportById(id) {
        const result = await this.prisma.handleError(()=>{
            return this.prisma.project_report.findFirst({
                where: {
                    project_report_id: id.value
                },
                include: this.reportInclude
            });
        });
        if (!result || !result.project_meeting_report) {
            throw new NotFoundException('Report not found');
        }
        return this.parser.convertToProjectMeetingReportEntity(result);
    }
    async getProjectStatusUpdateReportById(id) {
        const result = await this.prisma.handleError(()=>{
            return this.prisma.project_report.findFirst({
                where: {
                    project_report_id: id.value
                },
                include: this.reportInclude
            });
        });
        if (!result || !result.project_status_update_report) {
            throw new NotFoundException('Report not found');
        }
        return this.parser.convertToProjectStatusUpdateReportEntity(result);
    }
    async getProjectWorkerReportById(id) {
        const result = await this.prisma.handleError(()=>{
            return this.prisma.project_report.findFirst({
                where: {
                    project_report_id: id.value
                },
                include: this.reportInclude
            });
        });
        if (!result || !result.project_worker_report) {
            throw new NotFoundException('Report not found');
        }
        return this.parser.convertToProjectWorkerReportEntity(result);
    }
    constructor(logger, prisma){
        this.logger = logger;
        this.prisma = prisma;
        this.reportCommonInclude = {
            form_attached_files: true,
            project_budget_change: true,
            project_close_report: true,
            project_common_report: true,
            project_meeting_report: true,
            project_status_update_report: true
        };
        this.reportRelationShip = {
            progress_check_report: {
                include: {
                    progress_check_reported_worker: true
                }
            },
            project_worker_report: {
                include: {
                    reported_workers: true
                }
            }
        };
        this.reportInclude = {
            ...this.reportCommonInclude,
            ...this.reportRelationShip
        };
        this.logger.setContext(ReportTable.name);
        this.prisma.setLoggerContext(ReportTable.name);
        this.parser = new ReportParser(this.logger);
    }
}
ReportTable = _ts_decorate([
    Injectable(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CustomLogger === "undefined" ? Object : CustomLogger,
        typeof PrismaService === "undefined" ? Object : PrismaService
    ])
], ReportTable);

//# sourceMappingURL=table.js.map