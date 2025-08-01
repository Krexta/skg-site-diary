function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
import assert from "assert";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CustomLogger } from "./index.js";
export class AppConfig {
    static LoggingLogLevel() {
        const env = AppConfig.env;
        switch(env){
            case 'test':
                return [
                    'error',
                    'warn',
                    'debug'
                ];
            case 'local':
                return [
                    'log',
                    'error',
                    'warn',
                    'debug',
                    'verbose',
                    'fatal'
                ];
            case 'dev':
            case 'development':
                return [
                    'log',
                    'error',
                    'warn',
                    'fatal'
                ];
            case 'production':
                return [
                    'log',
                    'error',
                    'fatal'
                ];
        }
        return [
            'log',
            'error',
            'warn',
            'debug',
            'verbose',
            'fatal'
        ];
    }
    static switchGraphileConfig(development, production) {
        const env = AppConfig.env;
        if (env && [
            'development',
            'dev',
            'production'
        ].includes(env)) {
            return production;
        }
        return development;
    }
    static get DatabaseUrl() {
        const env = process.env.DATABASE_URL;
        if (!env) {
            assert('DATABASE_URL not found!!');
        }
        return env ?? '';
    }
    static get isLocal() {
        return AppConfig.env === 'local';
    }
    get port() {
        return this.configService.getOrThrow('PORT') ?? '3030';
    }
    get isLocal() {
        return this.node_env === 'local';
    }
    get isDevelopment() {
        return [
            'development',
            'dev'
        ].includes(this.node_env);
    }
    get isValidationDisableErrorMessage() {
        return !(this.isLocal || this.isDevelopment);
    }
    switchSwaggerSetup(func) {
        if (this.isLocal === true) {
            return func();
        }
    }
    constructor(configService){
        this.configService = configService;
        this.logger = new CustomLogger('AppConfigService');
        const env = this.configService.getOrThrow('NODE_ENV');
        this.logger.debug(`NODE_ENV: ${env}`);
        this.node_env = env;
    }
}
AppConfig.env = process.env.NODE_ENV;
AppConfig = _ts_decorate([
    Injectable(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof ConfigService === "undefined" ? Object : ConfigService
    ])
], AppConfig);

//# sourceMappingURL=app.config.js.map