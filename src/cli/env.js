import process from "process";

const parseEnv = () => {
  const envEntries = Object.entries(process.env);
  const rssEntries = envEntries.filter((entry) => {
    return entry[0].match(/^RSS_/gim);
  });
  let result = [];
  rssEntries.forEach((item) => {
    result.push(`${item[0]}=${item[1]}`);
  });

  console.log(result.join("; "));
};

parseEnv();
