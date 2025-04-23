// ...existing requires
const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const HOD = require("../models/HOD");
const Security = require("../models/Security");
const Visitor = require("../models/Visitor");
const generateToken = require("../config/jwt");
const { generateOTP, sendOTPEmail } = require("../config/otpService");
const generateQRCode = require("../config/qrService");

let otpStore = {};

const getModelByRole = (role) => {
  switch (role) {
    case "student": return Student;
    case "faculty": return Faculty;
    case "hod": return HOD;
    case "security": return Security;
    case "visitor": return Visitor;
    default: return null;
  }
};

exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  const Model = getModelByRole(role);

  if (!Model) return res.status(400).json({ message: "Invalid role" });

  const user = await Model.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  let isMatch = false;

  // Handle students with plain text passwords
  if (role === "student") {
    if (user.password === password) {
      // Auto-hash the password now for future logins
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
      isMatch = true;
    } else {
      isMatch = await bcrypt.compare(password, user.password);
    }
  } else {
    isMatch = await bcrypt.compare(password, user.password);
  }

  if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

  const otp = generateOTP();
  otpStore[email] = otp;
  await sendOTPEmail(email, otp);

  res.json({ message: "OTP sent to email", email });
};

exports.verifyOTP = async (req, res) => {
  const { email, otp, role } = req.body;
  const Model = getModelByRole(role);

  if (!Model || otpStore[email] !== otp) {
    return res.status(400).json({ message: "Invalid role or OTP" });
  }

  const user = await Model.findOne({ email });

  if ((role === "student" || role === "faculty" || role === "hod") && !user.qrCodePath) {
    const qrPath = await generateQRCode(user.email, `${user._id}_${role}.png`);
    user.qrCodePath = qrPath;
    await user.save();
  }

  const token = generateToken(user._id, role);
  delete otpStore[email];
  res.json({ token, user });
};
