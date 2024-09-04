import CustomRouter from "../CustomRouter.js";
import { read, readOne, create, update, destroy } from "../../controller/user.controller.js";

class UsersRouter extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC"], create);
    this.read("/", ["PUBLIC"] , read);
    this.read("/:uid",["PUBLIC"], readOne);
    this.update("/:uid",["ADMIN", "PREM","USER"], update);
    this.destroy("/:uid", ["ADMIN"], destroy);
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();

