import CustomRouter from "../CustomRouter.js";
import { read, readOne, create, update, destroy } from "../../controller/order.controller.js";
class OrdersRouter extends CustomRouter {
  init() {
    this.read("/", ["USER","ADMIN", "PREM"], read);  // Solo los admin y prem pueden leer todas las órdenes
    this.read("/:oid", ["USER","ADMIN", "PREM"], readOne);  // Solo los admin y prem pueden leer una orden específica
    this.create("/", ["USER", "PREM"], create);  // Los usuarios normales y prem pueden crear órdenes
    this.update("/:oid", ["ADMIN", "PREM"], update);  // Solo los admin y prem pueden actualizar órdenes
    this.destroy("/:oid", ["ADMIN"], destroy);  // Solo los admin pueden eliminar órdenes
  }
}

const ordersRouter = new OrdersRouter();
export default ordersRouter.getRouter();

