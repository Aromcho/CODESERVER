import CustomRouter from "../CustomRouter.js";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { generateResetToken, sendResetEmail, verifyResetToken, updatePassword } from "../../utils/passwordResetService.js";


class SessionsRouter extends CustomRouter {
  init() {
    this.create("/register", passportCb("register"), async (req, res, next) => {
      try {
        return res.json({ statusCode: 201, message: "Registered!" });
      } catch (error) {
        return next(error);
      }
    });

    this.create("/login", passportCb("login"), async (req, res, next) => {
      try {
        const userRole = req.user.role;
        const token = req.user.token;

        if (userRole === 'admin') {
          return res
            .cookie('jwt', token, { httpOnly: true, signed: true })
            .json({ statusCode: 200, message: "Logged in!", redirectUrl: "/admin" });
        } else {
          return res
            .cookie('jwt', token, { httpOnly: true, signed: true })
            .json({ statusCode: 200, message: "Logged in!", redirectUrl: "/" });
        }
      } catch (error) {
        return next(error);
      }
    });

    this.read("/online", passportCb("jwt"), async (req, res, next) => {
      try {
        if (req.user) {
          return res.json({
            statusCode: 200,
            message: "Is online!",
            user_id: req.user.user_id,
            role: req.user.role,
          });
        }
        return res.json({
          statusCode: 401,
          message: "Bad auth!",
        });
      } catch (error) {
        return next(error);
      }
    });

    this.create("/signout", (req, res, next) => {
      try {
        res.clearCookie('jwt');
        return res.status(200).json({ message: "Signed out!" });
      } catch (error) {
        return next(error);
      }
    });

    // Ruta para iniciar sesión con Google
    this.read("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

    // Ruta de callback de Google después de la autenticación
    this.read("/google/callback", passport.authenticate("google", { session: false }), (req, res, next) => {
      try {
        const token = req.user.token;
        return res
          .cookie('jwt', token, { httpOnly: true, signed: true })
          .json({ statusCode: 200, message: "Logged in!", redirectUrl: "/" });
      } catch (error) {
        next(error);
      }
    });

    // Ruta para enviar el correo de restablecimiento de contraseña
    this.create("/password", async (req, res, next) => {
      const { email } = req.body;
      try {
        const token = await generateResetToken(email);
        await sendResetEmail(email, token);
    
        return res.status(200).json({ message: "Correo de restablecimiento enviado!" });
      } catch (error) {
        return next(error);
      }
    });

    // Ruta para actualizar la contraseña
    // Ruta para actualizar la contraseña
this.update("/password", async (req, res, next) => {
  const { token, newPassword } = req.body;
  try {
    const isValidToken = await verifyResetToken(token);
    if (!isValidToken) {
      return res.status(400).json({ message: "Token inválido o expirado" });
    }

    await updatePassword(token, newPassword);

    return res.status(200).json({ message: "Contraseña actualizada!" });
  } catch (error) {
    return next(error);
  }
});

    
    
  }
}

const sessionsRouter = new SessionsRouter();

export default sessionsRouter.getRouter();
