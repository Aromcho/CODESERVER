import { Router } from "express";
import userRouter from "./user.apijs";
import productRouter from "./product.api";
 

const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/product", productRouter);

export default apiRouter