
import "reflect-metadata";
import { Service } from "typedi";
import { Logger, LoggerInterface } from "../decorators/Logger";
import { downloadImage, getBase64FromFile } from "../utils/image.helper";

@Service()
export class ImageService {
  constructor(
    @Logger(__filename) private log: LoggerInterface
  ) { }

  public async downloadImage(
    url: string,
    timestamp: string
  ): Promise<Buffer | null> {
    this.log.info("download image : ", { url, timestamp });
    const filePath = await downloadImage(timestamp, url);
    if (!filePath) {
      return undefined;
    }
    return getBase64FromFile(filePath);
  }
}