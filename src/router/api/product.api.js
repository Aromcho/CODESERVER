import CustomRouter from "../CustomRouter.js";
import productManager from '../../data/mongo/managers/ProductManager.mongo.js';

class ProductsRouter extends CustomRouter {
  init() {
    // Ruta para leer todos los productos o filtrar por categoría
    this.read("/", async (req, res, next) => {
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
    });

    // Ruta para paginar productos con opción de filtrar por categoría
    this.read("/paginate", async (req, res, next) => {
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
    });

    // Ruta para leer un producto por ID
    this.read("/:pid", async (req, res, next) => {
      try {
        const { pid } = req.params;
        const product = await productManager.readOne(pid);
        if (product) {
          return res.status(200).json(product);
        } else {
          return res.error404();
        }
      } catch (error) {
        next(error);
      }
    });

    // Ruta para crear un nuevo producto
    this.create("/", async (req, res, next) => {
      try {
        const data = req.body;
        const createdProduct = await productManager.create(data);
        return res.status(201).json({
          message: 'Product created successfully',
          product: createdProduct,
        });
      } catch (error) {
        next(error);
      }
    });

    // Ruta para actualizar un producto por ID
    this.update("/:pid", async (req, res, next) => {
      try {
        const { pid } = req.params;
        const newData = req.body;
        const updatedProduct = await productManager.update(pid, newData);
        return res.status(200).json(updatedProduct);
      } catch (error) {
        next(error);
      }
    });

    // Ruta para eliminar un producto por ID
    this.destroy("/:pid", async (req, res, next) => {
      try {
        const { pid } = req.params;
        const deletedProduct = await productManager.destroy(pid);
        return res.status(200).json(deletedProduct);
      } catch (error) {
        next(error);
      }
    });
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();