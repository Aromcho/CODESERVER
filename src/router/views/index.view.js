import { Router } from "express";
import productRouter from "./product.view.js";
import usersRouter from "./user.view.js"
import productManager from "../../data/fs/ProductManager.fs.js";


const viewsRouter = Router();
  
viewsRouter.use("/products", productRouter);
viewsRouter.use("/users", usersRouter);
viewsRouter.get("/", async (req, res, next) => {
    try {
        const { category } = req.query;
        const products = await productManager.read(category);  // Añadir await aquí
        return res.render("index", { title: "home", products });
    } catch (error) {
        return next(error);
    }
});

export default viewsRouter;
