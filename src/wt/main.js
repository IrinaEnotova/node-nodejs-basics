import { Worker } from "worker_threads";
import path from "path";
import { fileURLToPath } from "url";
import os from "os";

const cpuCores = os.cpus();
const numberOfCPUCores = cpuCores.length;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToWorker = path.join(__dirname, "worker.js");

const performCalculations = async () => {
  const promises = [];
  for (let i = 0; i < numberOfCPUCores; i++) {
    promises.push(
      new Promise((resolve) => {
        const worker = new Worker(pathToWorker, { workerData: i + 10 });
        worker.on("message", (message) => {
          resolve(message);
        });
        worker.on("error", (err) => {
          resolve({ status: "error", data: null });
        });
      })
    );
  }

  Promise.allSettled(promises).then((data) => {
    const result = data.map((item) => {
      return item.value;
    });
    console.log(result);
  });
};

await performCalculations();
