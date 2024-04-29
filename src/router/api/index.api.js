import { Router } from "express";
import userRouter from "./user.api.js";
import productRouter from "./product.api.js";
 

const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/product", productRouter);

export default apiRouter