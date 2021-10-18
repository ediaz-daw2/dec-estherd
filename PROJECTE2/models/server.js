const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuarisPath = "/api";

    // Middlewares
    this.middlewares();

    // Rutes de l'aplicació
    this.routes();
  }

  middlewares() {
    // Lectura i parseig del body
    this.app.use(express.json());

    // Directori públic
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuarisPath, require("../routes/usuaris"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor funcionant en el port:", this.port);
    });
  }
}

module.exports = Server;