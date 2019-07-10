# Instructions

## Local websocket server

- Start a local websocket server

```bash
cd ../escenario_simple/ws_server
npm i
```


## Start Arcgis Websocket StreamServer

- Open two terminal windows

In the first one,

- Install dependencies
```bash
npm i
```

Start the service

```bash
node init.js "4.11"
```

In other window terminal, launch an static http server

```bash
cd static
http-server .
```

Open a Browser window and type the following url

```bash
http://localhost:8080
```
