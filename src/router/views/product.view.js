import { Router } from "express";
import productManager from "../../data/fs/ProductManager.fs.js";

const productRouter = Router();

productRouter.get("/", async (req, res, next) => {
    try {
        const { category } = req.query; 
        const products = await productManager.read(category);
        return res.render("products", { products });
    } catch (error) {
        return next(error);
    }
});
productRouter.get("/real", async (req, res, next) => {
    try {
        const { category } = req.query; 
        const products = await productManager.read(category);
        return res.render("products", { products });
    } catch (error) {
        return next(error);
    }
});
productRouter.get("/:pid", async(req,res, next) => {
    try {
        const { pid } = req.params;
        const one = await productManager.readOne(pid)
         return res.render("details", { product: one } )
    } catch (error) {
        return next(error);
    }
})
productRouter.post("/", async(req,res, next) => {
    try {
        const data = req.body;
        const createdProduct = await productManager.create(data);
        return res.status(201).json({
          message: "Product created successfully",
          product: createdProduct,
        });
      } catch (error) {
        next(error);
      }
    });
export default productRouter;
