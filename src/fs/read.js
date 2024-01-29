import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToFile = path.join(__dirname, "files", "fileToRead.txt");

const read = async () => {
  fs.stat(pathToFile, (err) => {
    if (err) {
      throw new Error("FS operation failed");
    }
  });

  fs.readFile(pathToFile, "utf8", (err, data) => {
    if (err) {
      throw new Error(`Error while reading fileToRead.txt`);
    } else {
      console.log(data);
    }
  });
};

await read();
