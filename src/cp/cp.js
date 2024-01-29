import childProcess from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToScript = path.join(__dirname, "files", "script.js");

const spawnChildProcess = async (args) => {
  const child = childProcess.fork(pathToScript, args, { stdio: ["pipe", "pipe", "pipe", "ipc"] });

  child.stdout.on("data", (data) => {
    process.stdout.write(`Received from child process: ${data}`);
  });

  child.stderr.on("error", (err) => {
    console.error(`child process stderr: ${err}`);
  });

  child.on("spawn", () => {
    console.log("\nStart spawn child process...\n");
  });

  process.stdin.pipe(child.stdin);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(["arg1", "arg2", "arg3", "arg4"]);
