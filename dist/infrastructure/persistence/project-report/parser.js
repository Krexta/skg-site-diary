import { format } from "date-fns";
import { File, ProgressCheckReport, ProjectBudgetChange, ProjectCloseReport, ProjectCommonReport, ProjectMeetingReport, ProjectStatusUpdateReport, ProjectWorkerReport } from "../../../domain/entity/index.js";
import { BillingClientId, ChangeReasonCode, CloseReportChecklist, ConsumedWorkersPercentage, CreateUserId, ExecutionBudgetUnitId, FileName, FilePath, ProgressReportData, ProjectId, ProjectReportId, ProjectStatusCode, ReportText, ReportTypeCode, Title, TotalPerformancePercentage, UploadUserId, WorkerId, YEAR_MONTH_DAY_FORMAT, YearMonthDay } from "../../../domain/value/index.js";
export class ReportParser {
    convertToBaseProjectArgs(record) {
        return {
            id: ProjectReportId.from(record.project_report_id),
            createUserId: CreateUserId.from(record.create_user_id),
            reportDate: YearMonthDay.from(format(record.report_date, YEAR_MONTH_DAY_FORMAT)),
            projectId: ProjectId.from(record.project_id),
            files: record.form_attached_files.map((file)=>new File({
                    name: FileName.from(file.file_name),
                    path: FilePath.from(file.file_path),
                    uploadUserId: UploadUserId.from(file.upload_user_id)
                }))
        };
    }
    convertToProgressCheckReportEntity(record) {
        return new ProgressCheckReport({
            ...this.convertToBaseProjectArgs(record),
            title: Title.from(record.progress_check_report.title),
            reportText: ReportText.from(record.progress_check_report.report_text),
            executionBudgetUnitId: ExecutionBudgetUnitId.from(record.progress_check_report.execution_budget_unit_id),
            progressReportData: ProgressReportData.from(record.progress_check_report.progress_report_data),
            totalPerformancePercentage: TotalPerformancePercentage.from(record.progress_check_report.total_performance_percentage.toString()),
            consumedWorkersPercentage: ConsumedWorkersPercentage.from(record.progress_check_report.consumed_workers_percentage.toString()),
            workerIds: record.progress_check_report.progress_check_reported_worker.map((worker)=>WorkerId.from(worker.worker_id))
        });
    }
    convertToProjectBudgetChangeEntity(record) {
        return new ProjectBudgetChange({
            ...this.convertToBaseProjectArgs(record),
            title: Title.from(record.project_budget_change.title),
            reportText: ReportText.from(record.project_budget_change.report_text),
            changeReasonCode: ChangeReasonCode.from(record.project_budget_change.change_reason_code),
            billingClientId: BillingClientId.from(record.project_budget_change.billing_client_id)
        });
    }
    convertToProjectCloseReportEntity(record) {
        return new ProjectCloseReport({
            ...this.convertToBaseProjectArgs(record),
            title: Title.from(record.project_close_report.title),
            reportText: ReportText.from(record.project_close_report.report_text),
            closeReportChecklist: CloseReportChecklist.from(record.project_close_report.close_report_checklist)
        });
    }
    convertToProjectCommonReportEntity(record) {
        return new ProjectCommonReport({
            ...this.convertToBaseProjectArgs(record),
            title: Title.from(record.project_common_report.title),
            reportText: ReportText.from(record.project_common_report.report_text)
        });
    }
    convertToProjectMeetingReportEntity(record) {
        return new ProjectMeetingReport({
            ...this.convertToBaseProjectArgs(record),
            title: Title.from(record.project_meeting_report.title),
            reportText: ReportText.from(record.project_meeting_report.report_text)
        });
    }
    convertToProjectStatusUpdateReportEntity(record) {
        return new ProjectStatusUpdateReport({
            ...this.convertToBaseProjectArgs(record),
            title: Title.from(record.project_status_update_report.title),
            reportText: ReportText.from(record.project_status_update_report.report_text),
            projectStatusCode: ProjectStatusCode.from(record.project_status_update_report.project_status_code)
        });
    }
    convertToProjectWorkerReportEntity(record) {
        return new ProjectWorkerReport({
            ...this.convertToBaseProjectArgs(record),
            title: Title.from(record.project_worker_report.title),
            reportText: ReportText.from(record.project_worker_report.report_text),
            reportTypeCode: ReportTypeCode.from(record.project_worker_report.report_type_code),
            workerIds: record.project_worker_report.reported_workers.map((worker)=>WorkerId.from(worker.worker_id))
        });
    }
    constructor(logger){
        this.logger = logger;
    }
}

//# sourceMappingURL=parser.js.map