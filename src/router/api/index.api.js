import CustomRouter from "../CustomRouter.js";
import userRouter from "./user.api.js";
import productRouter from "./product.api.js";
import cartsRouter from "./carts.api.js"; 
import sessionsRouter from "./sessions.api.js";
import orderRouter from "./order.api.js";
import ticketsRouter from "./tickets.api.js";
import loggerRouter from "./logger.api.js";

class ApiRouter extends CustomRouter {
  init() {
    this.use("/user", userRouter);
    this.use("/product", productRouter);
    this.use("/cart", cartsRouter); 
    this.use("/sessions", sessionsRouter);
    this.use("/orders", orderRouter );
    this.use("/tickets", ticketsRouter );
    this.use("/loggers", loggerRouter); // Añadir el router de logs

  }
}

const apiRouter = new ApiRouter();



export default apiRouter.getRouter();
