import { Router } from "express";
import userRouter from "./user.api.js";
import productRouter from "./product.api.js";
import cartsRouter from "./carts.api.js"; 
import cookiesRouter from "./cookies.api.js";
import sessionsRouter from "./sessions.api.js";
import orderRouter from "./order.api.js";
import ticketsRouter from "./tickets.api.js";


const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/product", productRouter);
apiRouter.use("/cart", cartsRouter); 
apiRouter.use("/cookies", cookiesRouter);
apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/orders", orderRouter );
apiRouter.use("/tickets", ticketsRouter );

export default apiRouter;
