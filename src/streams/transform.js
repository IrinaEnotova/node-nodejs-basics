import Stream from "stream";
import process from "process";

const transform = async () => {
  const transformStream = new Stream.Transform({
    transform(data, _, callback) {
      const reversedData = data.toString().split("").reverse().join("");
      callback(null, `${reversedData}\n`);
    },
  });

  process.stdin.pipe(transformStream).pipe(process.stdout);
};

await transform();
