import fs from "fs";
import path from "path";
import process from "process";
import { fileURLToPath } from "url";
import readline from "readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToWrite = path.join(__dirname, "files", "fileToWrite.txt");

const write = async () => {
  const stream = fs.createWriteStream(fileToWrite);

  stream.on("error", (err) => {
    process.stdout.write(`An error occured while writing to the file. Error: ${err.message}\n`);
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Enter a sentence (Ctrl+C or 'exit' to stop): ",
  });

  rl.prompt();

  rl.on("line", (line) => {
    switch (line.trim()) {
      case "exit":
        rl.close();
        break;
      default:
        const sentence = line + "\n";
        stream.write(sentence);
        rl.prompt();
        break;
    }
  }).on("close", () => {
    stream.end();
    stream.on("finish", () => {
      console.log(`All your sentences have been written to ${fileToWrite}`);
    });
    setTimeout(() => {
      process.exit(0);
    }, 100);
  });
};

await write();
