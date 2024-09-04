import { Router } from "express";
import usersManager from "../DAO/mongo/managers/UserManager.mongo.js";
import { verifyToken } from "../utils/token.util.js";

class CustomRouter {
    constructor() {
        this.router = Router();
        this.init();
    }

    getRouter() {
        return this.router;
    }

    init() {}

    responses = (req, res, data) => {
        res.response200 = (response) => res.json({ statusCode: 200, response });
        res.paginate = (response, info) => res.json({ statusCode: 200, response, info });
        res.response201 = (response) => res.json({ statusCode: 201, response });
        res.error400 = (message) => res.json({ statusCode: 400, message });
        res.error401 = () => res.json({ statusCode: 401, message: "Bad Auth!" });
        res.error403 = () => res.json({ statusCode: 403, message: "Forbidden" });
        res.error404 = () => res.json({ statusCode: 404, message: "not found docs" });
        return data();
    };

    policies = (policies) => async (req, res, next) => {
        if (!Array.isArray(policies)) {
            return res.error400("Policies should be an array.");
        }
    
        if (policies.includes("PUBLIC")) {
            return next();
        } else {
            let token = req.signedCookies["jwt"]; // Usar la cookie firmada "jwt"
            if (!token) return res.error401();
            try {
                token = verifyToken(token);
                const { role, email } = token;
                if (
                    (policies.includes("USER") && role === 'USER') ||
                    (policies.includes("ADMIN") && role === 'ADMIN') ||
                    (policies.includes("PREM") && role === 'PREM')
                ) {
                    const user = await usersManager.readByEmail(email);
                    req.user = user; // Proteger la contraseña
                    return next();
                } else {
                    return res.error403();
                }
            } catch (error) {
                return res.error400(error.message);
            }
        }
    };
    
    applyCbs(callbacks) {
        return callbacks.map(callback => (req, res, next) => {
            try {
                callback(req, res, next);
            } catch (error) {
                return next(error);
            }
        });
    }

    create(path, arrayOfPolicies, ...callbacks) {
        this.router.post(path, this.responses, this.policies(arrayOfPolicies), ...this.applyCbs(callbacks));
    }

    read(path, arrayOfPolicies, ...callbacks) {
        this.router.get(path, this.responses, this.policies(arrayOfPolicies), ...this.applyCbs(callbacks));
    }

    update(path, arrayOfPolicies, ...callbacks) {
        this.router.put(path, this.responses, this.policies(arrayOfPolicies), ...this.applyCbs(callbacks));
    }

    destroy(path, arrayOfPolicies, ...callbacks) {
        this.router.delete(path, this.responses, this.policies(arrayOfPolicies), ...this.applyCbs(callbacks));
    }

    use(path, ...callbacks) {
        this.router.use(path, this.responses,  ...this.applyCbs(callbacks));
    }
}

export default CustomRouter;
