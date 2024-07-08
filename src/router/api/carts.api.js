import { Router } from 'express';
import cartsManager from '../../data/mongo/managers/CartManager.mongo.js';

const cartsRouter = Router();

cartsRouter.get("/", read);
cartsRouter.get("/:nid", readOne);
cartsRouter.post("/", create);
cartsRouter.put("/:nid", update);
cartsRouter.delete("/:nid", destroy);
cartsRouter.delete("/all/:nid", destroyAll);


async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await cartsManager.create(data);
    return res.json({
      statusCode: 201,
      message: "CREATED ID: " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}
async function read(req, res, next) {
  try {
    const { user_id } = req.query;
    const all = await cartsManager.read({ user_id });
    if (all.length > 0) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      const error = new Error("Not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function readOne(req, res, next) {
  try {
    const { nid } = req.params;
    if (!nid) {
      const error = new Error("NID is required");
      error.statusCode = 400;
      throw error;
    }
    const one = await cartsManager.readOne(nid);
    if (one) {
      return res.json({
        statusCode: 200,
        response: one,
      });
    } else {
      const error = new Error("Not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { nid } = req.params;
    const data = req.body;
    const one = await cartsManager.update(nid, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { nid } = req.params;
    const one = await cartsManager.destroy(nid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}
// metodo destroyAll para eliminar todos los productos del carrito
async function destroyAll(req, res, next) {
  try {
    const { nid } = req.query;
    const all = await cartsManager.read({ nid });
    if (all.length > 0) {
      all.forEach(async (item) => {
        await cartsManager.destroy(item._id);
      });
      return res.json({
        statusCode: 200,
        response: "All items deleted",
      });
    } else {
      const error = new Error("Not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

 

export default cartsRouter;
