import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import zlib from "zlib";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToCompress = path.join(__dirname, "files", "fileToCompress.txt");
const pathToArchive = path.join(__dirname, "files", "archive.gz");

const compress = async () => {
  const gzip = zlib.createGzip();
  const input = fs.createReadStream(fileToCompress);
  const output = fs.createWriteStream(pathToArchive);

  input.pipe(gzip).pipe(output);
};

await compress();
