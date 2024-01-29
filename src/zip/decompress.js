import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import zlib from "zlib";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputFile = path.join(__dirname, "files", "fileToCompress.txt");
const pathToArchive = path.join(__dirname, "files", "archive.gz");

const decompress = async () => {
  const unzip = zlib.createUnzip();
  const input = fs.createReadStream(pathToArchive);
  const output = fs.createWriteStream(outputFile);

  input.pipe(unzip).pipe(output);
};

await decompress();
