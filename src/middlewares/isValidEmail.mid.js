// middleware para comprovar si el email es valido
import usersManager from "../data/mongo/managers/UserManager.mongo.js";

async function isValidEmail(req, res, next) {
    try {
        const { email } = req.body;
        const one = await usersManager.readByEmail(email);
        if (one) {
            const error = new Error("bad outh from register!");
            error.statusCode = 401;
            throw error;
        }
        return next()
    } catch (error) {
        return next(error);
    }
}
export default isValidEmail;

