import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { createHash, verifyHash } from "../utils/hash.util.js";
import usersManager from "../data/mongo/managers/UserManager.mongo.js";
import { createToken } from "../utils/token.util.js";

// Estrategia de registro local
passport.use("register", new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, email, password, done) => {
  try {
    if (!email || !password) {
      const error = new Error("Please enter email and password!");
      error.statusCode = 400;
      return done(error);
    }
    const userExist = await usersManager.readByEmail(email);
    if (userExist) {
      const error = new Error("User already exists with that email.");
      error.statusCode = 400;
      return done(error);
    }
    const hashPassword = createHash(password);
    req.body.password = hashPassword;
    const user = await usersManager.create(req.body);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Estrategia de login local
passport.use("login", new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, email, password, done) => {
  try {
    const one = await usersManager.readByEmail(email);
    if (!one) {
      const error = new Error("Bad auth from login!");
      error.statusCode = 401;
      return done(error, false);
    }
    const verify = verifyHash(password, one.password);
    if (verify) {
      const user = { email, role: one.role, photo: one.photo, user_id: one._id, online: true };
      const token = createToken(user);
      user.token = token;
      return done(null, user);
    }
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    return done(error);
  } catch (error) {
    return done(error);
  }
}));

// Estrategia de Google
passport.use("google", new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/api/sessions/google/callback",
  passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    const { id, displayName, photos } = profile;
    let user = await usersManager.readByEmail(id);
    if (!user) {
      user = { email: id, password: createHash(id), name: displayName, photo: photos[0].value };
      user = await usersManager.create(user);
    }
    const token = createToken({ email: user.email, role: user.role, user_id: user._id });
    user.token = token;
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.use("jwt", new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.signedCookies["jwt"]]),
  secretOrKey: process.env.SECRET_JWT,
}, (data, done) => {
  try {
    if (data) {
      return done(null, data);
    } else {
      const error = new Error("Forbidden from jwt!");
      error.statusCode = 403;
      return done(error);
    }
  } catch (error) {
    return done(error);
  }
}));


export default passport;
