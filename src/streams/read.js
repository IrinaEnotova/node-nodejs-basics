import fs from "fs";
import path from "path";
import process from "process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToRead = path.join(__dirname, "files", "fileToRead.txt");

const read = async () => {
  const stream = fs.createReadStream(fileToRead);

  stream.on("error", (err) => {
    process.stdout.write(`error: ${err.message}\n`);
  });

  stream.on("data", (chunk) => {
    process.stdout.write(`${chunk}\n`);
  });
};

await read();
