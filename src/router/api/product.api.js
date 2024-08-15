import CustomRouter from "../CustomRouter.js";
import productManager from '../../data/mongo/managers/ProductManager.mongo.js';

class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"],  read);
    this.read("/paginate",["PUBLIC"],  paginate);
    this.read("/:pid",["PUBLIC"],  readOne);
    this.create("/",["admin"],  create);
    this.update("/:pid",["PUBLIC"],  update);
    this.destroy("/:pid",["PUBLIC"],  destroy);
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();

async function read(req, res, next) {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await productManager.read(filter);
    if (products.length > 0) {
      return res.response200(products);
    } else {
      return res.error404();
    }
  } catch (error) {
    next(error);
  }
}

// Ruta para paginar productos con opción de filtrar por categoría
async function paginate(req, res, next) {
  try {
    const filter = {};
    const opts = {};

    if (req.query.limit) {
      opts.limit = parseInt(req.query.limit, 10);
    }
    if (req.query.page) {
      opts.page = parseInt(req.query.page, 10);
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const all = await productManager.paginate({ filter, opts });
    const info = {
      totalDocs: all.totalDocs,
      page: all.page,
      totalPages: all.totalPages,
      limit: all.limit,
      prevPage: all.prevPage,
      nextPage: all.nextPage
    };

    return res.paginate(all.docs, info);
  } catch (error) {
    return next(error);
  }
}

// Ruta para leer un producto por ID
async function readOne(req, res, next) {
  try {
    const { pid } = req.params;
    const product = await productManager.readOne(pid);
    if (product) {
      return res.response200(product);
    } else {
      return res.error404();
    }
  } catch (error) {
    next(error);
  }
}

// Ruta para crear un nuevo producto
async function create(req, res, next) {
  try {
    const data = req.body;
    const createdProduct = await productManager.create(data);
    return res.response201({
      message: 'Product created successfully',
      product: createdProduct,
    });
  } catch (error) {
    next(error);
  }
}

// Ruta para actualizar un producto por ID
async function update(req, res, next) {
  try {
    const { pid } = req.params;
    const newData = req.body;
    const updatedProduct = await productManager.update(pid, newData);
    return res.response200(updatedProduct);
  } catch (error) {
    next(error);
  }
}

// Ruta para eliminar un producto por ID
async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    const deletedProduct = await productManager.destroy(pid);
    return res.response200(deletedProduct);
  } catch (error) {
    next(error);
  }
}
