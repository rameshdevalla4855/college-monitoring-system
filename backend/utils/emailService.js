const nodemailer = require("nodemailer");

// Check environment variables
if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
  console.error("❌ Missing MAIL_USER or MAIL_PASS in environment variables");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendNotificationEmail = async ({ to, subject, text }) => {
  try {
    if (!to || !subject || !text) {
      throw new Error("Missing email fields: to, subject, or text");
    }

    const info = await transporter.sendMail({
      from: process.env.MAIL_ID || process.env.MAIL_USER, // fallback if MAIL_ID not set
      to,
      subject,
      text,
    });

    console.log("✅ Email sent:", info.response);
  } catch (err) {
    console.error("❌ Error sending email:", err.message || err);
  }
};

module.exports = { sendNotificationEmail };
