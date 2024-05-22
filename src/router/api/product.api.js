import { Router } from "express";
import productManager from "../../data/mongo/managers/ProductManager.mongo.js"

const productRouter = Router();

productRouter.get("/", read);
productRouter.get("/:pid", readOne);
productRouter.post("/", create);
productRouter.put("/:pid", update);
productRouter.delete("/:pid", destroy);

async function create(req, res, next) {
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
}

async function read(req, res, next) {
  try {
    const { category } = req.query;
    const products = await productManager.read(category);
    if (products.length > 0) {
      return res.status(200).json(products);
    } else {
      const error = new Error("Products not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

async function readOne(req, res, next) {
  try {
    const { pid } = req.params;
    const product = await productManager.readOne(pid);
    if (product) {
      return res.status(200).json(product);
    } else {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { pid } = req.params;
    const newData = req.body;
    const updatedProduct = await productManager.update(pid, newData);
    return res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    const deletedProduct = await productManager.destroy(pid);
    return res.status(200).json(deletedProduct);
  } catch (error) {
    next(error);
  }
}

export default productRouter;