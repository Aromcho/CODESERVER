import CustomRouter from "../CustomRouter.js";
import userManager from "../../data/mongo/managers/UserManager.mongo.js";

class UsersRouter extends CustomRouter {
  init() {
    this.create("/", async (req, res, next) => {
      try {
        const data = req.body;
        const one = await userManager.create(data);
        return res.response201(one);
      } catch (error) {
        return next(error);
      }
    });

    this.read("/", async (req, res, next) => {
      try {
        const { role } = req.query;
        const all = await userManager.read(role);
        if (all.length > 0) {
          
          return res.response200(all);

        } else {
          return res.error404();
        }
      } catch (error) {
        return next(error);
      }
    });

    this.read("/:uid", async (req, res, next) => {
      try {
        const { uid } = req.params;
        const one = await userManager.readOne(uid);
        if (one) {
          return res.response200(one);
        } else {
          return res.error404();
        }
      } catch (error) {
        return next(error);
      }
    });

    this.update("/:uid", async (req, res, next) => {
      try {
        const { uid } = req.params;
        const data = req.body;
        const one = await userManager.update(uid, data);
        return res.response200(one);
      } catch (error) {
        return next(error);
      }
    });

    this.destroy("/:uid", async (req, res, next) => {
      try {
        const { uid } = req.params;
        const one = await userManager.destroy(uid);
        return res.response200(one);
      } catch (error) {
        return next(error);
      }
    });
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();

