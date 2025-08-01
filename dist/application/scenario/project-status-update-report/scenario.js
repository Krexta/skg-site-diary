function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
import { BadGatewayException, BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ReportRepository } from "../../../domain/repository/index.js";
import { ProjectReportId } from "../../../domain/value/index.js";
import { CustomLogger } from "../../../utility/index.js";
import { ProjectStatusUpdateReportParser } from "./parser.js";
export class ProjectStatusUpdateReportScenario {
    async pushProjectStatusUpdateReport(input) {
        try {
            const entity = this.parser.convertToProjectReport(input);
            const result = await this.repository.createProjectStatusUpdateReport(entity);
            return this.parser.convertProjectReportToReference(result);
        } catch (error) {
            if ([
                BadRequestException,
                BadGatewayException
            ].includes(error.constructor)) {
                throw error;
            }
            this.logger.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }
    async update(id, updateData) {
        try {
            const entity = await this.repository.getProjectStatusUpdateReportById(ProjectReportId.from(id));
            const data = this.parser.formatDataToUpdate(entity.createUserId.value, updateData);
            const updatedEntity = entity.update(data);
            const result = await this.repository.updateProjectStatusUpdateReport(updatedEntity);
            return this.parser.convertProjectReportToReference(result);
        } catch (error) {
            if ([
                BadRequestException,
                BadGatewayException,
                NotFoundException
            ].includes(error.constructor)) {
                throw error;
            }
            this.logger.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }
    constructor(logger, repository){
        this.logger = logger;
        this.repository = repository;
        this.logger.setContext(ProjectStatusUpdateReportScenario.name);
        this.parser = new ProjectStatusUpdateReportParser(this.logger);
    }
}
ProjectStatusUpdateReportScenario = _ts_decorate([
    Injectable(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CustomLogger === "undefined" ? Object : CustomLogger,
        typeof ReportRepository === "undefined" ? Object : ReportRepository
    ])
], ProjectStatusUpdateReportScenario);

//# sourceMappingURL=scenario.js.map