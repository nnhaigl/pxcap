import { Application } from "express";
import { MicroframeworkLoader, MicroframeworkSettings } from "microframework-w3tec";
import { createExpressServer } from "routing-controllers";
import { ImageController } from "../controllers";
import { ErrorHandlerMiddleware } from "../middlewares";

export const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    const expressApp: Application = createExpressServer({
        cors: false,
        classTransformer: true,
        defaultErrorHandler: false,
        controllers: [ImageController],
        middlewares: [ErrorHandlerMiddleware]
    });
    expressApp.listen(process.env.PORT || 5555);
    // Here we can set the data for other loaders
    settings.setData("express_app", expressApp);
};
