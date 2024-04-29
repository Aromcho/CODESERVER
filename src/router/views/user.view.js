import { Router } from "express";
import userManager from "../../data/fs/UserManager.fs.js";

const usersRouter = Router()

usersRouter.get("/", async (req, res, next) => {
    try {
        const { role } = req.query; 
        const users = await userManager.read(role);
        return res.render("users", { users });
    } catch (error) {
        return next(error);
    }
});
usersRouter.get("/register", async (req, res, next) => {
    try {
        const { role } = req.query; 
        const users = await userManager.read(role);
        return res.render("register", { users, role });
    } catch (error) {
        return next(error);
    }
});
usersRouter.get("/:uid", async(req,res, next) => {
    try {
        const { uid } = req.params;
        const one = await userManager.readOne(uid)
         return res.render("profile", { user: one } )
    } catch (error) {
        return next(error);
    }
})
usersRouter.post("/", async(req,res, next) => {
    try {
        const data = req.body;
        const one = await userManager.create(data);
        return res.json({
            statusCode: 201,
            message: "User created successfully",
            data: one,
          });
    } catch (error) {
        next(error)
    }
})
export default usersRouter