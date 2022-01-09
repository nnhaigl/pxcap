import "reflect-metadata";
import { JsonController, Get, getMetadataArgsStorage, QueryParam } from "routing-controllers";
import { OpenAPI, ResponseSchema, routingControllersToSpec } from "routing-controllers-openapi";
import { ImageService } from "../services/image.service";
import { Inject, Service } from "typedi";
import { IsNotEmpty } from "class-validator";

export class ImageResponse {
  @IsNotEmpty()
  public url: string;
}

@JsonController("/ffmpeg/image")
@Service()
@OpenAPI({})
export class ImageController {
  constructor(
    @Inject()
    private imageService: ImageService
  ) { }

  @Get("/")
  @ResponseSchema(Buffer)
  public async getById(@QueryParam("timestamp") timestamp: string, @QueryParam("url") url: string): Promise<Buffer> {
    return this.imageService.downloadImage(url, timestamp);
  }
}


const storage = getMetadataArgsStorage();
routingControllersToSpec(storage);
