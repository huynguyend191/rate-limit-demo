const axios = require("axios");
const readline = require("readline");
const sleep = require("../sleep");

let runTime;
let reqPerSec;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputRequestPerSecond = () => {
  return new Promise((resolve, reject) => {
    rl.question("Enter number of requests per second: ", (request) => {
      reqPerSec = request;
      resolve();
    });
  });
};

const inputRunTime = () => {
  return new Promise((resolve, reject) => {
    rl.question("Enter run time (s): ", (time) => {
      runTime = time;
      resolve();
    });
  });
};

const main = async () => {
  await inputRunTime();
  await inputRequestPerSecond();
  const current = Date.now();
  while (Date.now() < current + runTime * 1000) {
    for (let i = 0; i < reqPerSec; i++) {
      axios
        .get("http://localhost:5000/news")
        .then((result) => {
          console.log(result.data.message);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
    await sleep(1000);
  }
};

main();
