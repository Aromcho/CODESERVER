import express from "express";
import indexRouter from "./src/router/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import { engine } from "express-handlebars";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import socketCb from "./src/router/index.socket.js"

import __dirname from "./utils.js";

const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
const nodeServer = createServer(server);
nodeServer.listen(port, ready);



// Handlebars
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", path.join(__dirname, "src/views"));

//
const socketServer = new Server(nodeServer);
socketServer.on("connection", socketCb);
export { socketServer };

//
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/public", express.static("public"));
server.use(express.static(path.join(__dirname, "/public")));

// Rutas y middleware de manejo de errores
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);