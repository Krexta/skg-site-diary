import * as fs from "fs";
import * as path from "path";
import { BadRequestException, Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as yaml from "js-yaml";
import { AppModule } from "./module/app.module.js";
import { AppConfig, CustomLogger } from "./utility/index.js";
function swaggerSetup(app) {
    const logger = new Logger('swagger');
    const config = new DocumentBuilder().setTitle('SKG Site Diary API').setDescription('SKG 現場記録API').setVersion('0.1.0').addBearerAuth().build();
    const document = SwaggerModule.createDocument(app, config);
    fs.writeFileSync(path.resolve(process.cwd(), 'doc/openapi/openapi.yaml'), yaml.dump(document, {
        skipInvalid: true,
        noRefs: true
    }));
    const endpoint = 'api';
    SwaggerModule.setup(endpoint, app, document);
    logger.warn(`Swagger UI is available on /${endpoint}`);
}
async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
        logger: AppConfig.LoggingLogLevel()
    });
    const configService = app.get(AppConfig);
    app.useLogger(app.get(CustomLogger));
    app.useGlobalPipes(new ValidationPipe({
        disableErrorMessages: configService.isValidationDisableErrorMessage,
        transform: true,
        exceptionFactory: (validationErrors = [])=>{
            return new BadRequestException(validationErrors.map((error)=>{
                if (error.children && error.children[0] && error.children[0].children) {
                    return Object.values(error.children[0].children[0].constraints ?? {})[0];
                }
                return Object.values(error.constraints ?? {})[0];
            }));
        }
    }));
    const logger = new Logger('bootstrap');
    configService.switchSwaggerSetup(()=>swaggerSetup(app));
    await app.listen(configService.port);
    logger.debug(`Server running on port: ${new URL(await app.getUrl()).port}`);
}
bootstrap();

//# sourceMappingURL=main.js.map