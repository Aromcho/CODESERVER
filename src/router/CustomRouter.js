import { Router } from "express";

class CustomRouter {

    constructor() {
        this.router = Router();
        this.init();
    }
    getRouter() {
      return this.router;
    }
    init() {}
    applyCbs(callbacks) {
       return callbacks.map(callback => async (...params) =>{
        try {
            await callback.apply(this, params)
        } catch (error) {
            return params[2](error);
            
        }
       });

    }

    responses = ( req, res, data) => {
        res.response200 = (response) => res.json({ statusCode: 200, response })
        res.paginate = (response,info) => res.json({ statusCode: 200, response, info })
        res.response201 = (response) => res.json({ statusCode: 201, response })
        res.error400 = (message) => res.json({ statusCode: 400, message: message })
        res.error401 = () => res.json({ statusCode: 401, message: "Bad Auth!" })
        res.error403 = () => res.json({ statusCode: 403, message: "Forbidden" })
        res.error404 = () => res.json({ statusCode: 404, message: "not found docs" })
        return data();
    }

    policies = (policies) => async (req, res, next) => {
        if (policies.includes("PUBLIC")) return next();
        else {
          let token = req.cookies["token"];
          if (!token) return res.response401();
          else {
            try {
                token = verifyToken(token);
              const { role, email } = token;
              if (
                (policies.includes("user") && role === 0) ||
                (policies.includes("admin") && role === 1)
              ) {
                const user = await usersManager.readByEmail(email);
                //proteger contraseña del usuario!!!
                req.user = user;
                return next();
              } else return res.error403();
            } catch (error) {
              return res.error400(error.message);
            }
          }
        }
      };


    create(path,  ...callbacks) {
        this.router.post(path,this.responses, this.applyCbs(callbacks));
    }
    read(path,  ...callbacks) {
        this.router.get(path,this.responses, this.applyCbs(callbacks));
    }
    update(path,  ...callbacks) {
        this.router.put(path,this.responses, this.applyCbs(callbacks));
    }
    destroy(path,  ...callbacks) {
        this.router.delete(path,this.responses, this.applyCbs(callbacks));
    }
    use(path, ...callbacks) {
        this.router.use(path, this.responses, this.applyCbs(callbacks));
    }
}

export default CustomRouter;