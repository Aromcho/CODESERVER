import CustomRouter from "../CustomRouter.js";
import { readTicket } from "../../controller/tickets.controller.js";

class TicketsRouter extends CustomRouter {
  init() {
    this.read("/:nid", ["PUBLIC"],  readTicket);
  }
}

const ticketsRouter = new TicketsRouter();
export default ticketsRouter.getRouter();

