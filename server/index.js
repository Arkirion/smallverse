import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";
import { PORT } from "./config.js";

// const PORT = 3000
const app = express();
const server = http.createServer(app);
const ioServer = new SocketServer(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
  },
});

app.use(cors());
app.use(morgan("dev"));

let clients = {};

ioServer.on("connection", (playerClient) => {
  console.log(
    `User ${playerClient.id} connected, there are currently ${ioServer.engine.clientsCount} users connected`
  );

  //Add a new player client indexed by his id
  clients[playerClient.id] = {
    position: [0, 0, 0],
  };

  ioServer.sockets.emit("move", clients);

  playerClient.on('move', ({ id, position }) => {
    if (!position) {
      position = [0,0,0]
    }
    if (clients[id]) {
      clients[id].position = position
      ioServer.sockets.emit('move', clients)
    }
  })

  playerClient.on("disconnect", () => {
    //Delete this player client from the object
    delete clients[playerClient.id];

    ioServer.sockets.emit('move', clients)
  });
});

server.listen(PORT);

console.log("listening at " + PORT);
