import log from "../utils/winston.util.js";

function winston(req, res, next) {
    req.logger = log;
    next();
}