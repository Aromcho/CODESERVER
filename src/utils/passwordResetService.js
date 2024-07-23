import crypto from "crypto";
import User from "../data/mongo/models/user.model.js"; // Asegúrate de ajustar la importación a tu modelo de usuario
import { sendEmail } from "../utils/email.servise.js"; // Función para enviar correos
import bcrypt from 'bcrypt';

const tokenExpiryTime = 3600000; // 1 hora en milisegundos

export const generateResetToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const token = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + tokenExpiryTime; // Asegúrate de que esta línea se ejecuta correctamente
  await user.save();

  console.log(`Generated token for ${email}: ${token}`);

  return token;
};


export const sendResetEmail = async (email, token) => {
  const resetUrl = `http://localhost:5173/user/reset-password`;
  const message = `este es tu codigo de recuperacion ${token} para restablecer tu contraseña: ${resetUrl}`;

  await sendEmail({
    to: email,
    subject: "Restablecimiento de contraseña",
    text: message,
  });
};

export const verifyResetToken = async (token) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }, // Asegúrate de que esta condición está funcionando como esperas
  });

  console.log(`Verifying token: ${token}`);
  console.log(`User found: ${user ? user.email : 'No user found'}`);

  return !!user;
};


export const updatePassword = async (token, newPassword) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  console.log(`Updating password for token: ${token}`);
  console.log(`User found: ${user ? user.email : 'No user found'}`);

  if (!user) {
    throw new Error("Token inválido o expirado");
  }

  user.password = createHash(newPassword); // Usa la función createHash para hashear la nueva contraseña
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
};

