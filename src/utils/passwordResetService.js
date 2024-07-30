import crypto from "crypto";
import User from "../data/mongo/models/user.model.js";
import { sendEmail } from "../utils/email.servise.js";
import bcrypt from 'bcrypt';

const tokenExpiryTime = 3600000; // 1 hora en milisegundos

export const generateResetToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const token = Math.floor(100000 + Math.random() * 900000).toString(); // Generar un código de 6 dígitos
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + tokenExpiryTime;
  await user.save({ validateBeforeSave: false }); // Guardar sin validar otros campos

  return token;
};

export const sendResetEmail = async (email, token) => {
  const resetUrl = `http://localhost:5173/user/reset-password`;
  const message = `Este es tu código de recuperación ${token} para restablecer tu contraseña: ${resetUrl}`;

  await sendEmail({
    to: email,
    subject: "Restablecimiento de contraseña",
    text: message,
  });
};

export const verifyResetToken = async (token) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  return !!user;
};

export const updatePassword = async (token, newPassword) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("Token inválido o expirado");
  }

  user.password = await bcrypt.hash(newPassword, 10); // Hashear la nueva contraseña
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save({ validateBeforeSave: false }); // Guardar sin validar otros campos
};
