import { Router } from "express";
import productRouter from "./product.view.js";
import usersRouter from "./user.view.js"
import productManager from "../../data/fs/ProductManager.fs.js";
import cartManager from "../../data/fs/CartManager.fs.js";
import cartRouter from "./cart.view.js";


const viewsRouter = Router();
  
viewsRouter.use("/products", productRouter);
viewsRouter.use("/users", usersRouter);
viewsRouter.use("/cart", cartRouter)

viewsRouter.get("/", async (req, res, next) => {
    try {
        const { category } = req.query;
        const products = await productManager.read(category);  // Añadir await aquí
        return res.render("index", { title: "home", products });
    } catch (error) {
        return next(error);
    }
});
viewsRouter.post("/add-to-cart/:id", async (req, res, next) => {
    try {
        const productId = req.params.id;
        
        const product = await productManager.readOne(productId);
        cartManager.create({ 
            product_id: productId,
            product: product,
            quantity: 1,
         });
        
        res.sendStatus(200);
    } catch (error) {
        return next(error);
    }
});

viewsRouter.get("/cart", async (req, res, next) => {
    try {
        const cartItems = await cartManager.read();
        res.render("cart", { title: "Cart", cartItems }); // Renderiza la plantilla cart.handlebars y pasa los elementos del carrito como contexto
    } catch (error) {
        return next(error);
    }
});


export default viewsRouter;