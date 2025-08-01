import { BadRequestException } from "@nestjs/common";
import { File, ProjectBudgetChange } from "../../../domain/entity/index.js";
import { BillingClientId, ChangeReasonCode, CreateUserId, FileName, FilePath, ProjectId, ProjectReportId, ReportText, Title, UploadUserId, YearMonthDay } from "../../../domain/value/index.js";
export class ProjectBudgetChangeParser {
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
            const changeReasonCode = ChangeReasonCode.from(input.change_reason_code);
            const billingClientId = BillingClientId.from(input.billing_client_id);
            return new ProjectBudgetChange({
                id,
                createUserId,
                reportDate,
                projectId,
                files,
                title,
                reportText,
                changeReasonCode,
                billingClientId
            });
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(error.message);
        }
    }
    convertProjectBudgetChangeToReference(entity) {
        const { id, files, projectId, reportDate, createUserId, title, reportText, changeReasonCode, billingClientId } = entity;
        return {
            id: id.value,
            title: title.value ?? undefined,
            report_text: reportText.value ?? undefined,
            attached_files: files.map((file)=>({
                    file_name: file.name.value,
                    file_path: file.path.value
                })),
            change_reason_code: changeReasonCode.value,
            billing_client_id: billingClientId.value,
            project_id: projectId.value,
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
            changeReasonCode: this.returnValueOrUndefined(data.change_reason_code, ChangeReasonCode.from),
            billingClientId: this.returnValueOrUndefined(data.billing_client_id, BillingClientId.from),
            reportDate: this.returnValueOrUndefined(data.report_date, YearMonthDay.from)
        };
    }
    constructor(logger){
        this.logger = logger;
    }
}

//# sourceMappingURL=parser.js.map