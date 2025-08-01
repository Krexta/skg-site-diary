// cSpell:ignore graphiql
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
import { Controller, Get, Next, Post, Req, Res } from "@nestjs/common";
import { PostGraphileResponseNode } from "postgraphile";
import { AppScenario } from "../application/scenario/app.scenario.js";
import { middleware } from "./middleware/index.js";
export class AppController {
    getHello() {
        return this.appService.getHello();
    }
    graphiql(request, response, next) {
        middleware.graphiqlRouteHandler?.(new PostGraphileResponseNode(request, response, next));
    }
    graphql(request, response, next) {
        middleware.graphqlRouteHandler(new PostGraphileResponseNode(request, response, next));
    }
    constructor(appService){
        this.appService = appService;
    }
}
_ts_decorate([
    Get(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
_ts_decorate([
    Get(middleware.graphiqlRoute),
    _ts_param(0, Req()),
    _ts_param(1, Res()),
    _ts_param(2, Next()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Request === "undefined" ? Object : Request,
        typeof Response === "undefined" ? Object : Response,
        Function
    ]),
    _ts_metadata("design:returntype", void 0)
], AppController.prototype, "graphiql", null);
_ts_decorate([
    Post(middleware.graphqlRoute),
    _ts_param(0, Req()),
    _ts_param(1, Res()),
    _ts_param(2, Next()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Request === "undefined" ? Object : Request,
        typeof Response === "undefined" ? Object : Response,
        Function
    ]),
    _ts_metadata("design:returntype", void 0)
], AppController.prototype, "graphql", null);
AppController = _ts_decorate([
    Controller(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof AppScenario === "undefined" ? Object : AppScenario
    ])
], AppController);

//# sourceMappingURL=app.controller.js.map