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
import { Body, Controller, HttpCode, Param, Patch } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ProgressCheckReportScenario, ProjectBudgetChangeScenario, ProjectCloseReportScenario, ProjectCommonReportScenario, ProjectMeetingReportScenario, ProjectStatusUpdateReportScenario, ProjectWorkerReportScenario } from "../../../application/scenario/index.js";
import { CustomLogger } from "../../../utility/index.js";
import { UpdateProgressCheckReportRequest, UpdateProjectBudgetChangeRequest, UpdateProjectCloseReportRequest, UpdateProjectCommonReportRequest, UpdateProjectMeetingReportRequest, UpdateProjectStatusUpdateReportRequest, UpdateProjectWorkerReportRequest } from "../request/index.js";
import { ProgressCheckReportResponse, ProjectBudgetChangeResponse, ProjectCloseReportResponse, ProjectCommonReportResponse, ProjectMeetingReportResponse, ProjectStatusUpdateReportResponse, ProjectWorkerReportResponse } from "../response.js";
export class ReportUpdateController {
    async updateProjectCommonReport(id, body) {
        return await this.projectCommonReportScenario.update(id, body);
    }
    async updateProgressCheckReport(id, body) {
        return await this.progressCheckReportScenario.update(id, body);
    }
    async updateProjectBudgetChangeReport(id, body) {
        return await this.projectBudgetChangeScenario.update(id, body);
    }
    async updateProjectCloseReport(id, body) {
        return this.projectCloseReportScenario.update(id, body);
    }
    async updateProjectMeetingReport(id, body) {
        return await this.projectMeetingReportScenario.update(id, body);
    }
    async updateProjectStatusUpdateReport(id, body) {
        return this.projectStatusUpdateReportScenario.update(id, body);
    }
    async updateProjectWorkerReport(id, body) {
        return await this.projectWorkerReportScenario.update(id, body);
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
        this.logger.setContext(ReportUpdateController.name);
    }
}
_ts_decorate([
    Patch('project-common-reports/:id'),
    ApiOperation({
        description: 'Update project common report'
    }),
    ApiOkResponse({
        type: ProjectCommonReportResponse
    }),
    ApiNotFoundResponse({
        description: 'Report not found'
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
    _ts_param(0, Param('id')),
    _ts_param(1, Body()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof UpdateProjectCommonReportRequest === "undefined" ? Object : UpdateProjectCommonReportRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], ReportUpdateController.prototype, "updateProjectCommonReport", null);
_ts_decorate([
    Patch('progress-check-reports/:id'),
    ApiOperation({
        description: 'Update progress check report'
    }),
    ApiOkResponse({
        type: ProgressCheckReportResponse
    }),
    ApiNotFoundResponse({
        description: 'Report not found'
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
    _ts_param(0, Param('id')),
    _ts_param(1, Body()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof UpdateProgressCheckReportRequest === "undefined" ? Object : UpdateProgressCheckReportRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], ReportUpdateController.prototype, "updateProgressCheckReport", null);
_ts_decorate([
    Patch('project-budget-change-reports/:id'),
    ApiOperation({
        description: 'Update project budget change report'
    }),
    ApiOkResponse({
        type: ProjectBudgetChangeResponse
    }),
    ApiNotFoundResponse({
        description: 'Report not found'
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
    _ts_param(0, Param('id')),
    _ts_param(1, Body()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof UpdateProjectBudgetChangeRequest === "undefined" ? Object : UpdateProjectBudgetChangeRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], ReportUpdateController.prototype, "updateProjectBudgetChangeReport", null);
_ts_decorate([
    Patch('project-close-reports/:id'),
    ApiOperation({
        description: 'Update project close report'
    }),
    ApiOkResponse({
        type: ProjectCloseReportResponse
    }),
    ApiNotFoundResponse({
        description: 'Report not found'
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
    _ts_param(0, Param('id')),
    _ts_param(1, Body()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof UpdateProjectCloseReportRequest === "undefined" ? Object : UpdateProjectCloseReportRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], ReportUpdateController.prototype, "updateProjectCloseReport", null);
_ts_decorate([
    Patch('project-meeting-reports/:id'),
    ApiOperation({
        description: 'Update project meeting report'
    }),
    ApiOkResponse({
        type: ProjectMeetingReportResponse
    }),
    ApiNotFoundResponse({
        description: 'Report not found'
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
    _ts_param(0, Param('id')),
    _ts_param(1, Body()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof UpdateProjectMeetingReportRequest === "undefined" ? Object : UpdateProjectMeetingReportRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], ReportUpdateController.prototype, "updateProjectMeetingReport", null);
_ts_decorate([
    Patch('project-status-update-reports/:id'),
    ApiOperation({
        description: 'Update project status update report'
    }),
    ApiOkResponse({
        type: ProjectStatusUpdateReportResponse
    }),
    ApiNotFoundResponse({
        description: 'Report not found'
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
    _ts_param(0, Param('id')),
    _ts_param(1, Body()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof UpdateProjectStatusUpdateReportRequest === "undefined" ? Object : UpdateProjectStatusUpdateReportRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], ReportUpdateController.prototype, "updateProjectStatusUpdateReport", null);
_ts_decorate([
    Patch('project-worker-reports/:id'),
    ApiOperation({
        description: 'Update project worker report'
    }),
    ApiOkResponse({
        type: ProjectWorkerReportResponse
    }),
    ApiNotFoundResponse({
        description: 'Report not found'
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
    _ts_param(0, Param('id')),
    _ts_param(1, Body()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof UpdateProjectWorkerReportRequest === "undefined" ? Object : UpdateProjectWorkerReportRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], ReportUpdateController.prototype, "updateProjectWorkerReport", null);
ReportUpdateController = _ts_decorate([
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
], ReportUpdateController);

//# sourceMappingURL=update.controller.js.map