import CustomRouter from "../CustomRouter.js";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { register, login, online, signout, googleCallback, sendResetPasswordEmail, updatePasswordHandler } from "../../controller/sessions.controller.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"],passportCb("register"), register);
    this.create("/login", ["PUBLIC"],passportCb("login"), login);
    this.read("/online", ["PUBLIC"],passportCb("jwt"), online);
    this.create("/signout", ["USER","ADMIN","PREM"],signout);
    this.read("/google", ["PUBLIC"],passport.authenticate("google", { scope: ["email", "profile"] }));
    this.read("/google/callback", ["PUBLIC"],passport.authenticate("google", { session: false }), googleCallback);
    this.create("/password", [""],sendResetPasswordEmail);
    this.update("/password",[""], updatePasswordHandler);
  }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();

