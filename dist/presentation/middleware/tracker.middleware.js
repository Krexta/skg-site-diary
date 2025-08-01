function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
import { Injectable, Logger } from "@nestjs/common";
export class TrackerMiddleware {
    use(req, res, next) {
        const { ip, method, originalUrl, body } = req;
        const start = Date.now();
        this.logger.log(`[Request] ${ip} ${method} ${originalUrl} ${JSON.stringify(body)}`);
        const oldJson = res.json;
        res.json = (body)=>{
            res.locals.body = JSON.stringify(body);
            return oldJson.call(res, body);
        };
        res.on('finish', ()=>{
            const { statusCode, locals: { body } } = res;
            const elapsed = Date.now() - start;
            this.logger.log(`[Response] ${ip} ${method} ${originalUrl} ${statusCode} ${body ?? ''} ${elapsed}ms`);
        });
        next();
    }
    constructor(){
        this.logger = new Logger('HTTP');
    }
}
TrackerMiddleware = _ts_decorate([
    Injectable()
], TrackerMiddleware);

//# sourceMappingURL=tracker.middleware.js.map