import CustomRouter from "../CustomRouter.js";
import { read, readOne, create, update, destroy, destroyAll } from "../../controller/carts.controller.js";

class CartsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/:nid", ["PUBLIC"], readOne);
    this.create("/", ["USER", "PREM"], create);
    this.update("/:nid", ["PUBLIC"], update);
    this.destroy("/:nid", ["PUBLIC"], destroy);
    this.destroy("/all/:nid", ["PUBLIC"], destroyAll);
  }
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();


