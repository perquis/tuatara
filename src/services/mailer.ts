import "dotenv/config";
import nodemailer, { Transporter } from "nodemailer";

export class MailerService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_GMAIL_EMAIL,
        pass: process.env.SMTP_GMAIL_PASSWORD,
      },
    });
  }

  public async sendMailWhenInstallmentPaid() {
    await this.transporter.sendMail({
      from: process.env.SMTP_GMAIL_EMAIL,
      to: process.env.SMTP_GMAIL_EMAIL,
      subject: "Installment paid",
      text: `Installment has been paid`,
    });
  }
}
