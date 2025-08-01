function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
import { ApiProperty } from "@nestjs/swagger";
export class AttachedFileResponse {
}
_ts_decorate([
    ApiProperty({
        title: 'File name'
    }),
    _ts_metadata("design:type", String)
], AttachedFileResponse.prototype, "file_name", void 0);
_ts_decorate([
    ApiProperty({
        title: 'File path'
    }),
    _ts_metadata("design:type", String)
], AttachedFileResponse.prototype, "file_path", void 0);
export class ProjectCommonReportResponse {
}
_ts_decorate([
    ApiProperty({
        title: 'Id'
    }),
    _ts_metadata("design:type", String)
], ProjectCommonReportResponse.prototype, "id", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Title',
        required: false
    }),
    _ts_metadata("design:type", String)
], ProjectCommonReportResponse.prototype, "title", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Text',
        required: false
    }),
    _ts_metadata("design:type", String)
], ProjectCommonReportResponse.prototype, "report_text", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Attached files',
        type: [
            AttachedFileResponse
        ]
    }),
    _ts_metadata("design:type", Array)
], ProjectCommonReportResponse.prototype, "attached_files", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project id'
    }),
    _ts_metadata("design:type", String)
], ProjectCommonReportResponse.prototype, "project_id", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Report date'
    }),
    _ts_metadata("design:type", String)
], ProjectCommonReportResponse.prototype, "report_date", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Create user id'
    }),
    _ts_metadata("design:type", String)
], ProjectCommonReportResponse.prototype, "create_user_id", void 0);
export class ProgressCheckReportResponse extends ProjectCommonReportResponse {
}
_ts_decorate([
    ApiProperty({
        title: 'Execution budget unit id',
        description: 'UUIDv7'
    }),
    _ts_metadata("design:type", String)
], ProgressCheckReportResponse.prototype, "execution_budget_unit_id", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Progress report data',
        description: 'Json'
    }),
    _ts_metadata("design:type", Object)
], ProgressCheckReportResponse.prototype, "progress_report_data", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Total performance percentage'
    }),
    _ts_metadata("design:type", Number)
], ProgressCheckReportResponse.prototype, "total_performance_percentage", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Consumed workers percentage'
    }),
    _ts_metadata("design:type", Number)
], ProgressCheckReportResponse.prototype, "consumed_workers_percentage", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Reported worker ids'
    }),
    _ts_metadata("design:type", Array)
], ProgressCheckReportResponse.prototype, "reported_worker_ids", void 0);
export class ProjectBudgetChangeResponse extends ProjectCommonReportResponse {
}
_ts_decorate([
    ApiProperty({
        title: 'Change reason code'
    }),
    _ts_metadata("design:type", String)
], ProjectBudgetChangeResponse.prototype, "change_reason_code", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Billing client id'
    }),
    _ts_metadata("design:type", String)
], ProjectBudgetChangeResponse.prototype, "billing_client_id", void 0);
export class ProjectCloseReportResponse extends ProjectCommonReportResponse {
}
_ts_decorate([
    ApiProperty({
        title: 'Close report checklist'
    }),
    _ts_metadata("design:type", Object)
], ProjectCloseReportResponse.prototype, "close_report_checklist", void 0);
export class ProjectMeetingReportResponse extends ProjectCommonReportResponse {
}
export class ProjectStatusUpdateReportResponse extends ProjectCommonReportResponse {
}
_ts_decorate([
    ApiProperty({
        title: 'Project status id'
    }),
    _ts_metadata("design:type", String)
], ProjectStatusUpdateReportResponse.prototype, "project_status_code", void 0);
export class ProjectWorkerReportResponse extends ProjectCommonReportResponse {
}
_ts_decorate([
    ApiProperty({
        title: 'Report type code',
        required: false
    }),
    _ts_metadata("design:type", String)
], ProjectWorkerReportResponse.prototype, "report_type_code", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Reported worker ids'
    }),
    _ts_metadata("design:type", Array)
], ProjectWorkerReportResponse.prototype, "reported_worker_ids", void 0);

//# sourceMappingURL=response.js.map