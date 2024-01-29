import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToDir = path.join(__dirname, "files");

const list = async () => {
  fs.stat(pathToDir, (err) => {
    if (err) {
      throw new Error("FS operation failed");
    }
  });

  const filesArray = [];

  fs.readdir(pathToDir, (err, files) => {
    if (files.length === 0) {
      throw new Error("Directory is empty!");
    } else {
      files.forEach((file) => {
        filesArray.push(file);
        if (err) {
          throw new Error(`Error while reading ${file}`);
        }
      });
      console.log(filesArray);
    }
  });
};

await list();
