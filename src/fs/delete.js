import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToDeletedFile = path.join(__dirname, "files", "fileToRemove.txt");

const remove = async () => {
  fs.stat(pathToDeletedFile, (err) => {
    if (err) {
      throw new Error("FS operation failed");
    }
  });

  fs.rm(pathToDeletedFile, (err) => {
    if (err) {
      throw new Error("FS operation failed");
    }
    console.log(`fileToRemove.txt was successfully deleted!`);
  });
};

await remove();
