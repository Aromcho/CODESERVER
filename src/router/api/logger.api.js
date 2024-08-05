import CustomRouter from "../CustomRouter.js";
import logger from "../../utils/winston.util.js";

class LoggerRouter extends CustomRouter {
  init() {
    this.read("/", (req, res) => {
      req.logger.FATAL("Este es un mensaje de log de nivel FATAL");
      req.logger.ERROR("Este es un mensaje de log de nivel ERROR");
      req.logger.INFO("Este es un mensaje de log de nivel INFO");
      req.logger.HTTP("Este es un mensaje de log de nivel HTTP");
      res.json({ message: "Logs generados" });
    });
  }
}

const loggerRouter = new LoggerRouter();
export default loggerRouter.getRouter();
