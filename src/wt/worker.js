import { parentPort, workerData } from "worker_threads";

// n should be received from main thread
const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

const sendResult = () => {
  if (Math.random() > 0.5) {
    throw new Error("Special error message to check case 'error'");
  }
  parentPort.postMessage({
    status: "resolved",
    data: nthFibonacci(workerData),
  });
};

sendResult();
