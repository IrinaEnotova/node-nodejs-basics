import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToWrongFile = path.join(__dirname, "files", "wrongFilename.txt");
const pathToProperFile = path.join(__dirname, "files", "properFilename.md");

const rename = async () => {
  fs.stat(pathToWrongFile, (err) => {
    if (err) {
      throw new Error("FS operation failed");
    }
    fs.stat(pathToProperFile, (err) => {
      if (!err) {
        throw new Error("FS operation failed");
      }
      fs.rename(pathToWrongFile, pathToProperFile, (err) => {
        if (err) throw err;
        console.log("Rename complete!");
      });
    });
  });
};

await rename();
