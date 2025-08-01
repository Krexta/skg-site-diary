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
import { Transform, Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDateString, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, IsUrl, IsUUID, Matches, MaxLength, ValidateNested } from "class-validator";
export class CreateAttachedFile {
}
_ts_decorate([
    ApiProperty({
        title: 'File name',
        description: `
- MinLength: 1
- MaxLength: 255`
    }),
    IsString(),
    IsNotEmpty(),
    MaxLength(255),
    Transform(({ value })=>value?.toString().trim()),
    _ts_metadata("design:type", String)
], CreateAttachedFile.prototype, "file_name", void 0);
_ts_decorate([
    ApiProperty({
        title: 'File path',
        description: 'File path',
        example: 'example.com/1.pdf'
    }),
    IsUrl(),
    _ts_metadata("design:type", String)
], CreateAttachedFile.prototype, "file_path", void 0);
export class CreateProjectCommonReportRequest {
}
_ts_decorate([
    ApiProperty({
        title: 'Title',
        description: `- MinLength: 1`,
        required: false
    }),
    IsString(),
    IsNotEmpty(),
    IsOptional(),
    Transform(({ value })=>value?.toString().trim()),
    _ts_metadata("design:type", String)
], CreateProjectCommonReportRequest.prototype, "title", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Text',
        description: `- MinLength: 1`,
        required: false
    }),
    IsString(),
    IsNotEmpty(),
    IsOptional(),
    Transform(({ value })=>value?.toString().trim()),
    _ts_metadata("design:type", String)
], CreateProjectCommonReportRequest.prototype, "report_text", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Attached files',
        description: 'List of attached files',
        example: [
            {
                file_name: '1.jpg',
                file_path: 'example.com/1.jpg'
            },
            {
                file_name: '2.pdf',
                file_path: 'example.com/2.pdf'
            }
        ],
        type: [
            CreateAttachedFile
        ]
    }),
    IsArray(),
    ValidateNested({
        each: true
    }),
    Type(()=>CreateAttachedFile),
    _ts_metadata("design:type", Array)
], CreateProjectCommonReportRequest.prototype, "attached_files", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Project id',
        description: 'UUIDv7'
    }),
    IsUUID(7, {
        message: 'project_id must be UUIDv7'
    }),
    _ts_metadata("design:type", String)
], CreateProjectCommonReportRequest.prototype, "project_id", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Report date',
        format: 'yyyy-MM-dd'
    }),
    IsDateString({
        strict: true
    }),
    _ts_metadata("design:type", String)
], CreateProjectCommonReportRequest.prototype, "report_date", void 0);
export class CreateProgressCheckReportRequest extends CreateProjectCommonReportRequest {
}
_ts_decorate([
    ApiProperty({
        title: 'Execution budget unit id',
        description: 'UUIDv7'
    }),
    IsUUID(7, {
        message: 'execution_budget_unit_id must be UUIDv7'
    }),
    _ts_metadata("design:type", String)
], CreateProgressCheckReportRequest.prototype, "execution_budget_unit_id", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Progress report data',
        description: 'Json'
    }),
    IsObject(),
    _ts_metadata("design:type", Object)
], CreateProgressCheckReportRequest.prototype, "progress_report_data", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Total performance percentage',
        description: `
- Must be positive
- Must be Decimal(3,1)
`,
        required: false
    }),
    IsOptional(),
    Matches(/^(?:[0-9]{3}|([0-9]{1,2}(\.[0-9])?))$/, {
        message: 'total_performance_percentage must be positive Decimal(3,1)'
    }),
    _ts_metadata("design:type", String)
], CreateProgressCheckReportRequest.prototype, "total_performance_percentage", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Consumed workers percentage',
        description: `
- Must be positive
- Must be Decimal(3,2)
`,
        required: false
    }),
    IsOptional(),
    Matches(/^(?:[0-9]{3}|([0-9]{1,2}(\.[0-9])?)|([0-9]{1}(\.[0-9]{2})?))$/, {
        message: 'consumed_workers_percentage must be positive Decimal(3,2)'
    }),
    _ts_metadata("design:type", String)
], CreateProgressCheckReportRequest.prototype, "consumed_workers_percentage", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Reported worker ids',
        description: 'UUIDv7'
    }),
    IsUUID(7, {
        message: 'reported_worker_id must be UUIDv7',
        each: true
    }),
    ArrayNotEmpty(),
    IsArray(),
    _ts_metadata("design:type", Array)
], CreateProgressCheckReportRequest.prototype, "reported_worker_ids", void 0);
export class CreateProjectBudgetChangeRequest extends CreateProjectCommonReportRequest {
}
_ts_decorate([
    ApiProperty({
        title: 'Change reason code',
        enum: [
            'BUDGET_ERROR',
            'WORKING_MISTAKE',
            'CONSTRUCTION_CHANGE',
            'CONSTRUCTOR_MISTAKE',
            'PROCEDURE_MISTAKE',
            'TIME_LIMIT'
        ]
    }),
    IsEnum([
        'BUDGET_ERROR',
        'WORKING_MISTAKE',
        'CONSTRUCTION_CHANGE',
        'CONSTRUCTOR_MISTAKE',
        'PROCEDURE_MISTAKE',
        'TIME_LIMIT'
    ], {
        message: "change_reason_code must be one of the following values: ['BUDGET_ERROR', 'WORKING_MISTAKE', 'CONSTRUCTION_CHANGE', 'CONSTRUCTOR_MISTAKE', 'PROCEDURE_MISTAKE', 'TIME_LIMIT']"
    }),
    _ts_metadata("design:type", String)
], CreateProjectBudgetChangeRequest.prototype, "change_reason_code", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Billing client id',
        description: 'UUIDv7'
    }),
    IsUUID(7, {
        message: 'billing_client_id must be UUIDv7'
    }),
    _ts_metadata("design:type", String)
], CreateProjectBudgetChangeRequest.prototype, "billing_client_id", void 0);
export class CreateProjectCloseReportRequest extends CreateProjectCommonReportRequest {
}
_ts_decorate([
    ApiProperty({
        title: 'Close report checklist',
        description: 'Json'
    }),
    IsObject(),
    _ts_metadata("design:type", Object)
], CreateProjectCloseReportRequest.prototype, "close_report_checklist", void 0);
export class CreateProjectMeetingReportRequest extends CreateProjectCommonReportRequest {
}
export class CreateProjectStatusUpdateReportRequest extends CreateProjectCommonReportRequest {
}
_ts_decorate([
    ApiProperty({
        title: 'Project status code',
        enum: [
            'NOT_STARTED',
            'DESIGN_IN_PROGRESS',
            'START_AT_NEXT_MONTH',
            'IN_PROGRESS_AT_SITE',
            'CONSTRUCTION_COMPLETE',
            'MONTHLY_REPORT_COMPLETE',
            'PAYMENT_RECEIVED',
            'ABORTED',
            'DELETED'
        ]
    }),
    IsEnum([
        'NOT_STARTED',
        'DESIGN_IN_PROGRESS',
        'START_AT_NEXT_MONTH',
        'IN_PROGRESS_AT_SITE',
        'CONSTRUCTION_COMPLETE',
        'MONTHLY_REPORT_COMPLETE',
        'PAYMENT_RECEIVED',
        'ABORTED',
        'DELETED'
    ], {
        message: "project_status_code must be one of the following values: ['NOT_STARTED', 'DESIGN_IN_PROGRESS', 'START_AT_NEXT_MONTH', 'IN_PROGRESS_AT_SITE', 'CONSTRUCTION_COMPLETE', 'MONTHLY_REPORT_COMPLETE', 'PAYMENT_RECEIVED', 'ABORTED', 'DELETED']"
    }),
    _ts_metadata("design:type", String)
], CreateProjectStatusUpdateReportRequest.prototype, "project_status_code", void 0);
export class CreateProjectWorkerReportRequest extends CreateProjectCommonReportRequest {
}
_ts_decorate([
    ApiProperty({
        title: 'Report type code',
        description: `
- MinLength: 1
- MaxLength: 20`,
        required: false
    }),
    IsString(),
    IsNotEmpty(),
    MaxLength(20),
    IsOptional(),
    Transform(({ value })=>value?.toString().trim()),
    _ts_metadata("design:type", String)
], CreateProjectWorkerReportRequest.prototype, "report_type_code", void 0);
_ts_decorate([
    ApiProperty({
        title: 'Reported worker ids',
        description: 'UUIDv7'
    }),
    IsUUID(7, {
        message: 'reported_worker_id must be UUIDv7',
        each: true
    }),
    ArrayNotEmpty(),
    IsArray(),
    _ts_metadata("design:type", Array)
], CreateProjectWorkerReportRequest.prototype, "reported_worker_ids", void 0);

//# sourceMappingURL=create.request.js.map