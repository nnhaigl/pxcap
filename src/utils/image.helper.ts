import * as child_process from "child_process";
import { v4 } from "uuid";
import fs from "fs";
import path from "path";
import util from "util";
import moment from "moment";

const exec = util.promisify(child_process.exec);
const readFile = util.promisify(fs.readFile);
export const deleteFile = util.promisify(fs.unlink);

export const downloadImage = async (timestamp: string, url: string) => {
  const file_path = `${getFilePath(v4())}-${moment(new Date()).format("YYYY-MM-DD_HH:MM:SS")}.png`;
  const command = `ffmpeg -ss ${timestamp} -i ${url} -vframes 1 -vcodec png -an -y ${file_path}`;
  await exec(command);
  const existed = await isExists(file_path);
  return existed ? file_path : "";
};

export const getFilePath = (file_name: string) => {
  return path.resolve(__dirname, file_name);
};

export const isExists = async (file_path: string) => {
  return fs.existsSync(file_path);
};

export const getBase64FromFile = async (path: string): Promise<Buffer | null> => {
  try {
    const contents = await readFile(path, { encoding: "base64" });
    if (contents) {
      await deleteFile(path);
    }

    return Buffer.from(contents, "base64");
  } catch (e) {
    console.log(e);
    return undefined;
  }
};