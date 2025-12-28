import EmailService from "../config/emailService.js";

// Email Verification
export const sendVerificationEmail = async (toEmail, userName, otp) => {
  const htmlContent = {
    title: "Verify your Email",
    greetingLine1: "Thank you for joining <strong>Mahankari</strong>!",
    greetingLine2:
      "To complete your registration, please enter the OTP below in the verification screen.",
    userName: userName,
    otp: otp,
  };
  // Send Email
  return EmailService.sendEmail({
    to: toEmail.trim().toLowerCase(),
    subject: `Welcome to Mahankari, ${userName}! Please Verify Your Email`,
    text: "",
    htmlContent: htmlContent,
  });
};

// Account Activation
export const sendActivationEmail = async (toEmail, userName, otp) => {
  const htmlContent = {
    title: "Activate your Account",
    greetingLine1: "Your Mahankari account is almost ready!",
    greetingLine2:
      "To activate your account and start your journey with us, please enter the OTP below on the activation screen.",
    userName: userName,
    otp: otp,
  };
  // Send Email
  return EmailService.sendEmail({
    to: toEmail.trim().toLowerCase(),
    subject: `You're Almost There, ${userName} — Activate Your Mahankari Account`,
    text: "",
    htmlContent: htmlContent,
  });
};

// Password Reset
export const sendResetPasswordEmail = async (toEmail, userName, otp) => {
  const htmlContent = {
    title: "Reset Your Password",
    greetingLine1:
      "We received a request to reset your Mahankari account password.",
    greetingLine2:
      "Use the OTP below to reset your password. This OTP is valid for 10 minutes. If you did not request this, please ignore this email.",
    userName: userName,
    otp: otp,
  };

  // Send Email
  return EmailService.sendEmail({
    to: toEmail.trim().toLowerCase(),
    subject: `Reset Your Mahankari Password, ${userName}`,
    text: "",
    htmlContent: htmlContent,
  });
};
