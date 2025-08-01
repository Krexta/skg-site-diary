function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ProgressCheckReportScenario, ProjectBudgetChangeScenario, ProjectCloseReportScenario, ProjectCommonReportScenario, ProjectMeetingReportScenario, ProjectStatusUpdateReportScenario, ProjectWorkerReportScenario } from "../../../application/scenario/index.js";
import { CustomLogger } from "../../../utility/index.js";
import { CreateProgressCheckReportRequest, CreateProjectBudgetChangeRequest, CreateProjectCloseReportRequest, CreateProjectCommonReportRequest, CreateProjectMeetingReportRequest, CreateProjectStatusUpdateReportRequest, CreateProjectWorkerReportRequest } from "../request/index.js";
import { ProgressCheckReportResponse, ProjectBudgetChangeResponse, ProjectCloseReportResponse, ProjectCommonReportResponse, ProjectMeetingReportResponse, ProjectStatusUpdateReportResponse, ProjectWorkerReportResponse } from "../response.js";
export class ReportCreateController {
    async createProjectCommonReport(body) {
        return await this.projectCommonReportScenario.pushProjectCommonReport(body);
    }
    async createProgressCheckReport(body) {
        return await this.progressCheckReportScenario.pushProgressCheckReport(body);
    }
    async createProjectBudgetChangeReport(body) {
        return await this.projectBudgetChangeScenario.pushProjectBudgetChange(body);
    }
    async createProjectCloseReport(body) {
        return await this.projectCloseReportScenario.pushProjectCloseReport(body);
    }
    async createProjectMeetingReport(body) {
        return await this.projectMeetingReportScenario.pushProjectMeetingReport(body);
    }
    async createProjectStatusUpdateReport(body) {
        return await this.projectStatusUpdateReportScenario.pushProjectStatusUpdateReport(body);
    }
    async createProjectWorkerReport(body) {
        return await this.projectWorkerReportScenario.pushProjectWorkerReport(body);
    }
    constructor(logger, progressCheckReportScenario, projectBudgetChangeScenario, projectCloseReportScenario, projectCommonReportScenario, projectMeetingReportScenario, projectStatusUpdateReportScenario, projectWorkerReportScenario){
        this.logger = logger;
        this.progressCheckReportScenario = progressCheckReportScenario;
        this.projectBudgetChangeScenario = projectBudgetChangeScenario;
        this.projectCloseReportScenario = projectCloseReportScenario;
        this.projectCommonReportScenario = projectCommonReportScenario;
        this.projectMeetingReportScenario = projectMeetingReportScenario;
        this.projectStatusUpdateReportScenario = projectStatusUpdateReportScenario;
        this.projectWorkerReportScenario = projectWorkerReportScenario;
        this.logger.setContext(ReportCreateController.name);
    }
}
_ts_decorate([
    Post('project-common-reports'),
    ApiOperation({
        description: 'Create project common report'
    }),
    ApiOkResponse({
        type: ProjectCommonReportResponse
    }),
    ApiBadRequestResponse({
        description: 'リクエスト内容が不正'
    }),
    ApiInternalServerErrorResponse({
        description: 'サーバーエラー'
    }),
    ApiUnauthorizedResponse({
        description: '認証エラー'
    }),
    HttpCode(200),
    _ts_param(0, Body()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CreateProjectCommonReportRequest === "undefined" ? Object : CreateProjectCommonReportRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], ReportCreateController.prototype, "createProjectCommonReport", null);
_ts_decorate([
    Post('progress-check-reports'),
    ApiOperation({
        description: 'Create progress check report'
    }),
    ApiOkResponse({
        type: ProgressCheckReportResponse
    }),
    ApiBadRequestResponse({
        description: 'リクエスト内容が不正'
    }),
    ApiInternalServerErrorResponse({
        description: 'サーバーエラー'
    }),
    ApiUnauthorizedResponse({
        description: '認証エラー'
    }),
    HttpCode(200),
    _ts_param(0, Body()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CreateProgressCheckReportRequest === "undefined" ? Object : CreateProgressCheckReportRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], ReportCreateController.prototype, "createProgressCheckReport", null);
_ts_decorate([
    Post('project-budget-change-reports'),
    ApiOperation({
        description: 'Create project budget change report'
    }),
    ApiOkResponse({
        type: ProjectBudgetChangeResponse
    }),
    ApiBadRequestResponse({
        description: 'リクエスト内容が不正'
    }),
    ApiInternalServerErrorResponse({
        description: 'サーバーエラー'
    }),
    ApiUnauthorizedResponse({
        description: '認証エラー'
    }),
    HttpCode(200),
    _ts_param(0, Body()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CreateProjectBudgetChangeRequest === "undefined" ? Object : CreateProjectBudgetChangeRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], ReportCreateController.prototype, "createProjectBudgetChangeReport", null);
_ts_decorate([
    Post('project-close-reports'),
    ApiOperation({
        description: 'Create project close report'
    }),
    ApiOkResponse({
        type: ProjectCloseReportResponse
    }),
    ApiBadRequestResponse({
        description: 'リクエスト内容が不正'
    }),
    ApiInternalServerErrorResponse({
        description: 'サーバーエラー'
    }),
    ApiUnauthorizedResponse({
        description: '認証エラー'
    }),
    HttpCode(200),
    _ts_param(0, Body()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CreateProjectCloseReportRequest === "undefined" ? Object : CreateProjectCloseReportRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], ReportCreateController.prototype, "createProjectCloseReport", null);
_ts_decorate([
    Post('project-meeting-reports'),
    ApiOperation({
        description: 'Create project meeting report'
    }),
    ApiOkResponse({
        type: ProjectMeetingReportResponse
    }),
    ApiBadRequestResponse({
        description: 'リクエスト内容が不正'
    }),
    ApiInternalServerErrorResponse({
        description: 'サーバーエラー'
    }),
    ApiUnauthorizedResponse({
        description: '認証エラー'
    }),
    HttpCode(200),
    _ts_param(0, Body()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CreateProjectMeetingReportRequest === "undefined" ? Object : CreateProjectMeetingReportRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], ReportCreateController.prototype, "createProjectMeetingReport", null);
_ts_decorate([
    Post('project-status-update-reports'),
    ApiOperation({
        description: 'Create project status update report'
    }),
    ApiOkResponse({
        type: ProjectStatusUpdateReportResponse
    }),
    ApiBadRequestResponse({
        description: 'リクエスト内容が不正'
    }),
    ApiInternalServerErrorResponse({
        description: 'サーバーエラー'
    }),
    ApiUnauthorizedResponse({
        description: '認証エラー'
    }),
    HttpCode(200),
    _ts_param(0, Body()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CreateProjectStatusUpdateReportRequest === "undefined" ? Object : CreateProjectStatusUpdateReportRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], ReportCreateController.prototype, "createProjectStatusUpdateReport", null);
_ts_decorate([
    Post('project-worker-reports'),
    ApiOperation({
        description: 'Create project worker report'
    }),
    ApiOkResponse({
        type: ProjectWorkerReportResponse
    }),
    ApiBadRequestResponse({
        description: 'リクエスト内容が不正'
    }),
    ApiInternalServerErrorResponse({
        description: 'サーバーエラー'
    }),
    ApiUnauthorizedResponse({
        description: '認証エラー'
    }),
    HttpCode(200),
    _ts_param(0, Body()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CreateProjectWorkerReportRequest === "undefined" ? Object : CreateProjectWorkerReportRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], ReportCreateController.prototype, "createProjectWorkerReport", null);
ReportCreateController = _ts_decorate([
    ApiTags('Site diary'),
    Controller('reports'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CustomLogger === "undefined" ? Object : CustomLogger,
        typeof ProgressCheckReportScenario === "undefined" ? Object : ProgressCheckReportScenario,
        typeof ProjectBudgetChangeScenario === "undefined" ? Object : ProjectBudgetChangeScenario,
        typeof ProjectCloseReportScenario === "undefined" ? Object : ProjectCloseReportScenario,
        typeof ProjectCommonReportScenario === "undefined" ? Object : ProjectCommonReportScenario,
        typeof ProjectMeetingReportScenario === "undefined" ? Object : ProjectMeetingReportScenario,
        typeof ProjectStatusUpdateReportScenario === "undefined" ? Object : ProjectStatusUpdateReportScenario,
        typeof ProjectWorkerReportScenario === "undefined" ? Object : ProjectWorkerReportScenario
    ])
], ReportCreateController);

//# sourceMappingURL=create.controller.js.map