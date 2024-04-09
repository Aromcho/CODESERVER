import { Router } from "express";
import apiRouter from "./api/index.api";

const indexRouter = Router();

apiRouter.use("/api", apiRouter)
apiRouter.use("/", viewsRouter)

export default indexRouter