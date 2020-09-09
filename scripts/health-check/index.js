const { checkHealth } = require("./healthcheck");

defaultLogger = (message, objectStatus) => {
  if (!process.env.STRESS_TEST) {
    console.log(message, objectStatus);
  }
};

async function run() {
  // eslint-disable-next-line no-console
  //var uri = process.argv.slice(2);
  var uri = "https://testbridge.walletconnect.org";
  const result = await checkHealth(5000, defaultLogger, uri);

  if (result.alive) {
    // eslint-disable-next-line no-console
    console.log("Bridge is alive, check took", result.durationSeconds, "seconds");
    process.exit(0);
  } else {
    const errorMsg = (result.error && result.error) || "Unknown error";
    // eslint-disable-next-line no-console
    console.error("Check failed:", errorMsg);
    // eslint-disable-next-line no-console
    console.error(result.error);
    process.exit(1);
  }
}

run();
