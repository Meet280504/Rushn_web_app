const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: "ujassojitra@gmail.com",
    pass: "",
  },
});

async function sendOTPEmail(toEmail, otp) {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: toEmail,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It expires in 10 minutes.`,
      html: `<p>Your OTP code is <b>${otp}</b>. It expires in 10 minutes.</p>`,
    });
    return Boolean(info.messageId);
  } catch (err) {
    console.error("Failed to send OTP email:", err);
    return false;
  }
}

async function sendRegistrationSuccessEmail(toEmail, username, otp) {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: toEmail,
      subject: "Welcome! Verify your email",
      text: `Hi ${username}, welcome! Your verification OTP is ${otp}.`,
      html: `<p>Hi ${username}, welcome!</p><p>Your verification OTP is <b>${otp}</b>.</p>`,
    });
    return Boolean(info.messageId);
  } catch (err) {
    console.error("Failed to send registration email:", err);
    return false;
  }
}

module.exports = { sendOTPEmail, sendRegistrationSuccessEmail };


