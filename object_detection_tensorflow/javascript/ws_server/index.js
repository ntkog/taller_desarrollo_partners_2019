const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8000 });
const util = require('util');
const UTILS_PRESET = {
  compact: true,
  depth: 5,
  breakLength: 80
};

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {

    try {
      let measurement = JSON.parse(message);
      console.log(util.inspect(measurement, UTILS_PRESET));
    } catch(err) {
      console.log(err);
    }

  });
});
