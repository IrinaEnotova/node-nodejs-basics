import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createHash } from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToFile = path.join(__dirname, "files", "fileToCalculateHashFor.txt");

const calculateHash = async () => {
  const stream = fs.createReadStream(pathToFile, "utf8");

  stream.on("data", (data) => {
    const result = createHash("sha256").update(data).digest("hex");
    console.log(result);
  });
  stream.on("error", (err) => console.log(`Err: ${err.message}`));
};

await calculateHash();
