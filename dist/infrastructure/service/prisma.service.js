function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
import { BadGatewayException, Injectable } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { CustomLogger } from "../../utility/index.js";
export class PrismaService extends PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
    setLoggerContext(context) {
        this.logger.setContext(context);
    }
    async handleError(operation) {
        try {
            return await operation();
        } catch (error) {
            this.logger.error(error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new BadGatewayException(`${error.code}: ${error.message}`);
            }
            throw new BadGatewayException(error.message);
        }
    }
    constructor(logger){
        super(), this.logger = logger;
    }
}
PrismaService = _ts_decorate([
    Injectable(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CustomLogger === "undefined" ? Object : CustomLogger
    ])
], PrismaService);

//# sourceMappingURL=prisma.service.js.map