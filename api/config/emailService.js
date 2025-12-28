import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class EmailService {
  constructor() {
    // Create reusable transporter object using SMTP
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // Email (or App Password for Gmail)
        pass: process.env.APP_PASS, // Password / App Password
      },
    });
  }

  /**
   * Send plain text or HTML email
   * @param {Object} options
   * @param {String} options.to - Recipient email
   * @param {String} options.subject - Email subject
   * @param {String} options.text - Plain text content (optional)
   * @param {String} options.html - HTML content (optional)
   */
  async sendEmail({ to, subject, text, htmlContent }) {
    try {
      // Read Email Template
      const templatePath = path.join(
        __dirname,
        "../templates/emailTemplate.html"
      );
      const htmlTemplate = fs.readFileSync(templatePath, "utf8");

      // Replace placeholders with actual values
      const html = htmlTemplate
        .replace(/{{title}}/g, htmlContent.title)
        .replace(/{{greetingLine1}}/g, htmlContent.greetingLine1)
        .replace(/{{greetingLine2}}/g, htmlContent.greetingLine2)
        .replace(/{{userName}}/g, htmlContent.userName)
        .replace(/{{otp}}/g, htmlContent.otp)
        .replace(/{{year}}/g, new Date().getFullYear());

      const info = await this.transporter.sendMail({
        from: `Mahankari <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
        html,
      });

      console.log("📧 Email sent:", info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("❌ Email sending failed:", error);
      return { success: false, error };
    }
  }
}

export default new EmailService();
