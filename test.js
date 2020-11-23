const WebSocket = require("ws");

const ws = new WebSocket("https://localhost", {
  rejectUnauthorized: false,
});


ws.on("open", function() {
  //ws._socket.write(Buffer.from([0x89, 0xff]));
  let value = Buffer.from([0x89, 0xfe, 0xff, 0xff]);
  console.log(value.toString('utf-8'));
  ws._socket.write(value);
  process.exit();
});
