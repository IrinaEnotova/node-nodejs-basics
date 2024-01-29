import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToFiles = path.join(__dirname, "files");
const pathToCopy = path.join(__dirname, "files-copy");

const copy = async () => {
  function copyDir(src, dest) {
    fsp
      .readdir(src)
      .then((files) => {
        console.log("Start copying...");
        for (const file of files) {
          const srcPath = path.join(src, file);
          const destPath = path.join(dest, file);

          fs.stat(srcPath, (err, stats) => {
            if (err) {
              throw new Error(`error while copying ${stats}`);
            }
            if (stats.isDirectory()) {
              copyDir(srcPath, destPath);
            } else {
              fsp.copyFile(srcPath, destPath);
            }
          });
        }
      })
      .then(() => {
        console.log(`Dir "files-copy" was successfully created!`);
      });
  }

  fs.stat(pathToFiles, (err) => {
    if (err) {
      throw new Error("FS operation failed");
    }
  });
  fs.stat(pathToCopy, (err) => {
    if (!err) {
      throw new Error("FS operation failed");
    } else {
      fs.mkdir(pathToCopy, { recursive: false }, (err) => {
        if (err) throw err;
      });
    }
  });

  copyDir(pathToFiles, pathToCopy);
};

await copy();
