import { createTransport } from "nodemailer";

export const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_GMAIL_EMAIL,
    pass: process.env.SMTP_GMAIL_PASSWORD,
  },
});
