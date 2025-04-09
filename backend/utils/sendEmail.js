import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Gmail address
      pass: process.env.EMAIL_PASS,   // 16-char App Password from Google
    },
  });

  const info = await transporter.sendMail({
    from: `"SKILLONX" <yourgmail@gmail.com>`,
    to,
    subject,
    html,
  });
};
