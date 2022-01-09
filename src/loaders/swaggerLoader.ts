import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { defaultMetadataStorage as classTransformerMetadataStorage } from "class-transformer/storage";
import { MicroframeworkLoader, MicroframeworkSettings } from "microframework-w3tec";
import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import * as swaggerUi from "swagger-ui-express";
import { MetadataStorage, getFromContainer } from "class-validator";

export const swaggerLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    const expressApp = settings.getData("express_app");
    const storage = getMetadataArgsStorage();
    const { validationMetadatas } = getFromContainer(
        MetadataStorage
    ) as any;
    const schemas = validationMetadatasToSchemas(validationMetadatas, {
        classTransformerMetadataStorage,
        refPointerPrefix: "#/components/schemas/",
    });
    const swaggerFile = routingControllersToSpec(storage, {}, {
        components: {
            schemas: schemas
        }
    });


    // swaggerFile.servers = [
    //     {
    //         url: `/api`,
    //     },
    // ];

    expressApp.use("/swagger",
        swaggerUi.serve,
        swaggerUi.setup(swaggerFile)
    );
};
