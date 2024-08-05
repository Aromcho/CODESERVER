import CustomRouter from "../CustomRouter.js";
import cartsManager from "../../data/mongo/managers/CartManager.mongo.js";

class CartsRouter extends CustomRouter {
  init() {
    this.read("/", read);
    this.read("/:nid", readOne);
    this.create("/", create);
    this.update("/:nid", update);
    this.destroy("/:nid", destroy);
    this.destroy("/all/:nid", destroyAll);
  }
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();

async function read(req, res, next) {
  try {
    const { user_id } = req.query;
    const all = await cartsManager.read(user_id ? { user_id } : {});
    if (all.length > 0) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.error404();
    }
  } catch (error) {
    return next(error);
  }
}

async function readOne(req, res, next) {
  try {
    const { nid } = req.params;
    if (!nid) {
      return res.error400("NID is required");
    }
    const one = await cartsManager.readOne(nid);
    if (one) {
      return res.response200(one);
    } else {
      const error = new Error("Not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await cartsManager.create(data);
    return res.response201(one);
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { nid } = req.params;
    const data = req.body;
    const one = await cartsManager.update(nid, data);
    return res.response200(one);
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { nid } = req.params;
    const one = await cartsManager.destroy(nid);
    return res.response200(one);
  } catch (error) {
    return next(error);
  }
}

async function destroyAll(req, res, next) {
  try {
    const { nid } = req.query;
    const all = await cartsManager.read({ nid });
    if (all.length > 0) {
      for (const item of all) {
        await cartsManager.destroy(item._id);
      }
      return res.response200("All items deleted");
    } else {
      return res.error404();
    }
  } catch (error) {
    return next(error);
  }
}
