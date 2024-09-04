import CustomRouter from "../CustomRouter.js";
import { read, paginate, readOne, create, update, destroy,} from "../../controller/product.controller.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/paginate", ["PUBLIC"], paginate);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.read("/me", ["ADMIN", "PREM"], read);
    this.create("/", ["ADMIN", "PREM"], create); // Permitir que los roles ADMIN y PREM creen productos
    this.update("/:pid", ["ADMIN", "PREM"], update); // Solo ADMIN y PREM pueden actualizar productos
    this.destroy("/:pid", ["ADMIN"], destroy); // Solo ADMIN puede eliminar productos
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
