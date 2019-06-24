# Tools

- [websocat](https://github.com/vi/websocat)

## Basic CLI server

```bash
websocat -E -t ws-l:127.0.0.1:8888 broadcast:mirror:
```

## Basic CLI client
```bash
websocat ws://127.0.0.1:8888
```

## Basic NodeJS Websocket server

```javascript
const WebSocket = require('ws');
var DATA = require('./data.json');
const wss = new WebSocket.Server({ port: 8000 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  setInterval((ws) => {
    ws.send(JSON.stringify({...DATA.shift(), ObjectID : 1}));
  },2000,ws);

});
```


## Basic JS client (browser)

```javascript
const socket = new WebSocket('ws://localhost:8000');
socket.addEventListener('message', function (event) {
  console.log(event.data);
});
```
