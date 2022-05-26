const express = require("express");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000;

class MainServer {
  constructor() {
    this._app = express();
    this.configs();
  }
  configs() {
    // Settings
    this._app.set("port", PORT);

    // Middlewares
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: false }));
  }

  start() {
    let server = this._app.listen(this._app.get("port"), () => {
      console.log(`Server in port ${this._app.get("port")}`);
    });

    const io = new Server(server);
    io.on("connect", (socket) => {
      console.log("User Connected");

      socket.on("message", (data) => {
        io.emit("recived", data);
      });
    });
  }
}

const server = new MainServer();
server.start();
