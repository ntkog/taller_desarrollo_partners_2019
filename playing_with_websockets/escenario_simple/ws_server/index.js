const WebSocket = require('ws');
var DATA = require('./data.json');
const wss = new WebSocket.Server({ port: 8000 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  setInterval((ws) => {
    ws.send(JSON.stringify({...DATA.shift(), ObjectID : 1}));
  },1000,ws);

});
