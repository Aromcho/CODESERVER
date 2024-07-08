import { Router } from "express";
import usersManager from "../../data/mongo/managers/UserManager.mongo.js";
import isValidEmail from "../../middlewares/isValidEmail.mid.js";
import isValidData from "../../middlewares/isValidData.mid.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import isValidPassword from "../../middlewares/isValidPassword.mid.js";
import createHashPassword from "../../middlewares/createHashPassword.mid.js";
import passport from "../../middlewares/passport.mid.js";
import { token } from "morgan";

const sessionsRouter = Router();

sessionsRouter.post("/register", passport.authenticate("register", { session: false }) , async (req, res, next) => {
  try {
    return res.json({ statusCode:  201 ,message: "Registered!" });
  } catch (error) {
    return next(error);
  }
})

sessionsRouter.post("/login", passport.authenticate("login", { session: false }), async (req, res, next) => {
  try {
    const userRole = req.user.role;

    if (userRole === 'admin') {
      return res.json({ statusCode: 200, message: "Logged in!",token: req.user.token , redirectUrl: "/admin" });
    } else if (userRole === 'user') {
      return res.json({ statusCode: 200, message: "Logged in!",token: req.user.token , redirectUrl: "/" });
    } else {
      // Manejar otros roles o casos inesperados
      return res.json({ statusCode: 200, message: "Logged in!",token: req.user.token , redirectUrl: "/" });
    }
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.get("/online", async (req, res, next) => {
  try {
    if (req.session.online) {
      return res.status(200).json({
        message: "Is online!",
        user_id: req.session.user_id,
        role: req.session.role,
        online: true,
      });
    }
    return res.status(401).json({
      message: "Bad auth!",
    });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.post("/signout", (req, res, next) => {
  try {
    req.session.destroy();
    return res.status(200).json({ message: "Signed out!" });
  } catch (error) {
    return next(error);
  }
});
sessionsRouter.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));
sessionsRouter.get("/google/callback", passport.authenticate("google", { session: false}), (req, res, next) => {
  try {
    return res.json({ statusCode: 200, message: "Logged in!", redirectUrl: "/" });
  } catch (error) {
    
  }
  //res.redirect("/");
});

export default sessionsRouter;
