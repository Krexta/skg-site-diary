import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateProgressCheckReportRequest, CreateProjectBudgetChangeRequest, CreateProjectCloseReportRequest, CreateProjectCommonReportRequest, CreateProjectMeetingReportRequest, CreateProjectStatusUpdateReportRequest, CreateProjectWorkerReportRequest } from "./create.request.js";
export class UpdateProjectCommonReportRequest extends PartialType(OmitType(CreateProjectCommonReportRequest, [
    'project_id'
])) {
}
export class UpdateProgressCheckReportRequest extends PartialType(OmitType(CreateProgressCheckReportRequest, [
    'project_id'
])) {
}
export class UpdateProjectBudgetChangeRequest extends PartialType(OmitType(CreateProjectBudgetChangeRequest, [
    'project_id'
])) {
}
export class UpdateProjectCloseReportRequest extends PartialType(OmitType(CreateProjectCloseReportRequest, [
    'project_id'
])) {
}
export class UpdateProjectMeetingReportRequest extends PartialType(OmitType(CreateProjectMeetingReportRequest, [
    'project_id'
])) {
}
export class UpdateProjectStatusUpdateReportRequest extends PartialType(OmitType(CreateProjectStatusUpdateReportRequest, [
    'project_id'
])) {
}
export class UpdateProjectWorkerReportRequest extends PartialType(OmitType(CreateProjectWorkerReportRequest, [
    'project_id'
])) {
}

//# sourceMappingURL=update.request.js.map