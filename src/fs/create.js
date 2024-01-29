import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fullFilePath = path.join(__dirname, "files", "fresh.txt");
const textContent = "I am fresh and young";

const create = async () => {
  fs.stat(fullFilePath, (err) => {
    if (err) {
      fs.writeFile(fullFilePath, textContent, (err) => {
        if (err) throw err;
        console.log(`File "fresh.txt" was successfully created!`);
      });
    } else {
      throw new Error("FS operation failed");
    }
  });
};

await create();
