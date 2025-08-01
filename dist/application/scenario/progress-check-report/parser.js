import { BadRequestException } from "@nestjs/common";
import { File, ProgressCheckReport } from "../../../domain/entity/index.js";
import { ConsumedWorkersPercentage, CreateUserId, ExecutionBudgetUnitId, FileName, FilePath, ProgressReportData, ProjectId, ProjectReportId, ReportText, Title, TotalPerformancePercentage, UploadUserId, WorkerId, YearMonthDay } from "../../../domain/value/index.js";
export class ProgressCheckReportParser {
    convertToProjectReport(input) {
        try {
            const id = ProjectReportId.make();
            const createUserId = CreateUserId.make();
            const reportDate = YearMonthDay.from(input.report_date);
            const projectId = ProjectId.from(input.project_id);
            const uploadUserId = UploadUserId.from(createUserId.value);
            const files = input.attached_files.map((file)=>new File({
                    name: FileName.from(file.file_name),
                    path: FilePath.from(file.file_path),
                    uploadUserId
                }));
            const title = Title.from(input.title ?? null);
            const reportText = ReportText.from(input.report_text ?? null);
            const executionBudgetUnitId = ExecutionBudgetUnitId.from(input.execution_budget_unit_id);
            const progressReportData = ProgressReportData.from(input.progress_report_data);
            const totalPerformancePercentage = input.total_performance_percentage ? TotalPerformancePercentage.from(input.total_performance_percentage) : TotalPerformancePercentage.new();
            const consumedWorkersPercentage = input.consumed_workers_percentage ? ConsumedWorkersPercentage.from(input.consumed_workers_percentage) : ConsumedWorkersPercentage.new();
            const workerIds = input.reported_worker_ids.map((id)=>WorkerId.from(id));
            return new ProgressCheckReport({
                id,
                createUserId,
                reportDate,
                projectId,
                files,
                title,
                reportText,
                executionBudgetUnitId,
                progressReportData,
                totalPerformancePercentage,
                consumedWorkersPercentage,
                workerIds
            });
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(error.message);
        }
    }
    convertProjectReportToReference(entity) {
        const { id, files, projectId, reportDate, createUserId, title, reportText, executionBudgetUnitId, progressReportData, totalPerformancePercentage, consumedWorkersPercentage, workerIds } = entity;
        return {
            id: id.value,
            title: title.value ?? undefined,
            report_text: reportText.value ?? undefined,
            attached_files: files.map((file)=>({
                    file_name: file.name.value,
                    file_path: file.path.value
                })),
            execution_budget_unit_id: executionBudgetUnitId.value,
            progress_report_data: progressReportData.value,
            total_performance_percentage: Number(totalPerformancePercentage.toValue()),
            consumed_workers_percentage: Number(consumedWorkersPercentage.toValue()),
            project_id: projectId.value,
            reported_worker_ids: workerIds.map((id)=>id.value),
            report_date: reportDate.toString(),
            create_user_id: createUserId.value
        };
    }
    returnValueOrUndefined(value, operation) {
        if (value === undefined) {
            return undefined;
        }
        return operation(value);
    }
    formatDataToUpdate(userId, data) {
        const uploadUserId = UploadUserId.from(userId);
        return {
            files: data.attached_files?.map((file)=>new File({
                    name: FileName.from(file.file_name),
                    path: FilePath.from(file.file_path),
                    uploadUserId
                })),
            title: this.returnValueOrUndefined(data.title, Title.from),
            reportText: this.returnValueOrUndefined(data.report_text, ReportText.from),
            executionBudgetUnitId: this.returnValueOrUndefined(data.execution_budget_unit_id, ExecutionBudgetUnitId.from),
            progressReportData: this.returnValueOrUndefined(data.progress_report_data, ProgressReportData.from),
            totalPerformancePercentage: this.returnValueOrUndefined(data.total_performance_percentage, TotalPerformancePercentage.from),
            consumedWorkersPercentage: this.returnValueOrUndefined(data.consumed_workers_percentage, ConsumedWorkersPercentage.from),
            workerIds: data.reported_worker_ids?.map(WorkerId.from),
            reportDate: this.returnValueOrUndefined(data.report_date, YearMonthDay.from)
        };
    }
    constructor(logger){
        this.logger = logger;
    }
}

//# sourceMappingURL=parser.js.map