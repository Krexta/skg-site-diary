import { BadRequestException } from "@nestjs/common";
import { File, ProjectCloseReport } from "../../../domain/entity/index.js";
import { CloseReportChecklist, CreateUserId, FileName, FilePath, ProjectId, ProjectReportId, ReportText, Title, UploadUserId, YearMonthDay } from "../../../domain/value/index.js";
export class ProjectCloseReportParser {
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
            const closeReportChecklist = CloseReportChecklist.from(input.close_report_checklist);
            return new ProjectCloseReport({
                id,
                createUserId,
                reportDate,
                projectId,
                files,
                title,
                reportText,
                closeReportChecklist
            });
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(error.message);
        }
    }
    convertProjectReportToReference(entity) {
        const { id, files, projectId, reportDate, createUserId, title, reportText, closeReportChecklist } = entity;
        return {
            id: id.value,
            title: title.value ?? undefined,
            report_text: reportText.value ?? undefined,
            attached_files: files.map((file)=>({
                    file_name: file.name.value,
                    file_path: file.path.value
                })),
            close_report_checklist: closeReportChecklist.value,
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
            closeReportChecklist: this.returnValueOrUndefined(data.close_report_checklist, CloseReportChecklist.from),
            reportDate: this.returnValueOrUndefined(data.report_date, YearMonthDay.from)
        };
    }
    constructor(logger){
        this.logger = logger;
    }
}

//# sourceMappingURL=parser.js.map