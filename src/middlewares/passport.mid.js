// passpot
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../data/mongo/models/user.model.js";
import { createHash, verifyHash } from "../utils/hash.util.js";
import usersManager from "../data/mongo/managers/UserManager.mongo.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password,  done) => {
      try {
        if (!email || !password) {
          const error = new Error("Please enter email and password!");
          error.statusCode = 400;
          return done(error);
        }
        const userExist = await User.findOne({ email: email });
        if (userExist) {
          const error = new Error("User already exists with that email.");
          error.statusCode = 400; // Consider using 409 for conflict errors
          return done(error);
        }
        const hashPassword = createHash(password);
        req.body.password = hashPassword;
        const user = await usersManager.create(req.body);
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password,  done) => {
      try {
        const one = await usersManager.readByEmail(email);
        if (!one) {
          const error = new Error("Bad auth from login!");
          error.statusCode = 401;
          return done(null);
        }
        const verify = verifyHash(password, one.password);
        if (verify) {
          req.session.email = email;
          req.session.online = true;
          req.session.role = one.role;
          req.session.photo = one.photo;
          req.session.user_id = one._id;
          return done(null, one);
        }
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        return done(error);
      } catch (error) {
        return done(null);
      }
    }
  )
);


export default passport;
