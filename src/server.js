const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bd = require("./config/database.js");
const Usuario = require("./models/usuario");
const Libro = require("./models/libro");
const Prestamo = require("./models/prestamo");

class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT;

    this.server = require("http").createServer(this.app);

    this.paths = {
      users: "/api",
    };

    // Database
    this.dbConnection();

    // JSON
    this.app.use(express.json());

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async dbConnection() {
    try {
      // logica de la base de datos (escrito en español para entendimiento)
      await bd.authenticate();
      await Usuario.sync({ force: false });
      await Libro.sync({ force: false });
      await Prestamo.sync({ force: false });
      console.log("Database connected successfully");
    } catch (error) {
      console.log(error);
    }
  }

  middlewares() {
    // Morgan
    this.app.use(morgan("dev"));
    // Body parser
    this.app.use(express.json());
    // CORS
    this.app.use(cors());
  }

  routes() {
    this.app.use(this.paths.users, require("./routes/auth.routes"));
  }

  listen() {
    //Iniciar el servidor
    this.app.listen(this.port, () => {
      console.log(`Server running in port: http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
