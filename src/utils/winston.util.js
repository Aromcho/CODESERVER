import { createLogger, format, transports, addColors } from "winston";
const { colorize, simple } = format;
const { Console, File } = transports;

const levels = { FATAL: 0, ERROR: 1, INFO: 2, HTTP: 3 };
const colors = { FATAL: "red", ERROR: "white", INFO: "blue", HTTP: "green" };
addColors(colors);

const logger = createLogger({
  levels,
  format: colorize(),
  transports: [
    new Console({ level: "HTTP", format: simple() }),
    new File({
      level: "ERROR",
      filename: "./src/utils/errors/errors.log",
      format: simple(),
    }),
    new File({
      level: "INFO",
      filename: "./src/utils/errors/info.log",
      format: simple(),
    }),
    new File({
      level: "FATAL",
      filename: "./src/utils/errors/fatal.log",
      format: simple(),
    }),
  ],
});

export default logger;
