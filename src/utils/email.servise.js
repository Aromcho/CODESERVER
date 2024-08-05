import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "aromaguilar2@gmail.com",
      pass: process.env.GOOGLE_APP_PASWORD,
    },
  });

  const mailOptions = {
    from: "aromaguilar2@gmail.com",
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};
