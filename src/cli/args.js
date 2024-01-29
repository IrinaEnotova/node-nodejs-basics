import process from "process";

const parseArgs = () => {
  const args = process.argv;
  const [executer, file, ...rest] = args;
  const result = [];
  rest.forEach((arg, idx, args) => {
    if (arg.match(/^--/gm)) {
      result.push(`${arg.slice(2)} is ${args[idx + 1]}`);
    }
  });
  console.log(result.join(", "));
};

parseArgs();
