import express from "express";
import UsersManager from "./data/fs/UserManager.fs.js";
const router = express.Router();//server

const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);
 
// middlewares 

server.use(express.urlencoded({extended: true }));
server.use(router);

//routes 
server.get("/", async (req, res) => {
    try {
        return res.status(200).json({
            response: "CODER API",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: "CODER API ERROR",
            success: false
        });
    }
});

// parametros
server.get("/api/products/:title/:category", async (req, res) => {
    try {
        const { title, category } = req.params;
        const data = { title, category }
        const one = await UsersManager.create(data)
        return res.status(201).json({
            response: one,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: "ERROR",
            success: false
        });
    }
});
