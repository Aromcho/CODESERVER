import "dotenv/config.js";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import indexRouter from "./src/router/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import path from "path";
import { createServer } from "http";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";
import winston from "./src/middlewares/winston.mid.js";
import MongoStore from "connect-mongo";
import __dirname from "./utils.js";
import dbConnect from "./src/utils/dbConnect.util.js";
import argsUtil from "./src/utils/args.util.js";
import cluster from "cluster";
import os from "os";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/utils/swagger.util.js";

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
        cluster.fork();
    });
} else {
    const server = express();
    const port = 8080;

    const ready = async () => {
        console.log(`Worker ${process.pid} is running on port ${port}`);
        await dbConnect();
    };

    const nodeServer = createServer(server);
    nodeServer.listen(port, ready);

    // Middleware
    //server.use(winston);
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use("/public", express.static("public"));
    server.use(express.static(__dirname + "/public"));
    server.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Servir la carpeta uploads como estática
    server.use(morgan("dev"));
    server.use(cookieParser(process.env.SECRET));
    server.use(
        session({
            store: new MongoStore({ mongoUrl: process.env.MONGO_URI, ttl: 60 * 60 }),
            secret: process.env.SECRET,
            resave: true,
            saveUninitialized: true,
            cookie: { maxAge: 60 * 60 * 1000 },
        })
    );
    server.use(
        compression({
            brotli: { enabled: true, zlib: {} },
        })
    );

    // Configuración de CORS
    server.use(cors());

    // Swagger
  server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Rutas y middleware de manejo de errores
    server.use("/", indexRouter);
    server.use(errorHandler);
    server.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "public", "index.html"));
    });
    server.use(pathHandler);

    console.log(argsUtil);
}