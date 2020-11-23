const { checkHealth } = require("./healthcheck");

defaultLogger = (message, objectStatus) => {
  if (!process.env.STRESS_TEST) {
    console.log(message, objectStatus);
  }
};

async function run() {
  let uri;
  try {
    uri = process.argv.slice(2)[0];
  } catch {}
  uri = uri == undefined ? "https://bridge.walletconnect.org" : uri;
  console.log("Using bridge:", uri);
  const result = await checkHealth(5000, defaultLogger, uri);

  if (result.alive) {
    // eslint-disable-next-line no-console
    return `Bridge is alive, check took, ${result.durationSeconds} seconds`;
  } else {
    const errorMsg = (result.error && result.error) || "Unknown error";
    // eslint-disable-next-line no-console
    console.error("Check failed:", errorMsg);
    // eslint-disable-next-line no-console
    //reject(result.error);
    return result.error;
  }
}

tasks = [];
for (let i = 0; i < 20; i++) {
  tasks.push(run());
}

Promise.all(tasks)
  .then(values => {
    console.log(values);
    process.exit(0);
  })
  .catch(err => {
    console.log(err);
    //process.exit(1);
  });
