const Visitor = require("../models/Visitor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendNotificationEmail } = require('../utils/emailService');
const Student = require("../models/Student"); // Import student model

// Signup
exports.visitorSignup = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  const existing = await Visitor.findOne({ email });
  if (existing) return res.status(400).json({ message: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newVisitor = new Visitor({ name, email, password: hashedPassword, mobile });
  await newVisitor.save();
  res.json({ message: "Signup successful" });
};

// Login
exports.visitorLogin = async (req, res) => {
  const { email, password } = req.body;
  const visitor = await Visitor.findOne({ email });
  if (!visitor) return res.status(400).json({ message: "Invalid email" });

  const isMatch = await bcrypt.compare(password, visitor.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  visitor.otp = otp;
  visitor.otpExpire = Date.now() + 5 * 60 * 1000;
  await visitor.save();

  await sendNotificationEmail({
    to: visitor.email,
    subject: "Your OTP Code",
    text: `OTP: ${otp}`,
  });
  


  res.json({ message: "OTP sent to email" });
};

// Verify OTP
exports.verifyVisitorOtp = async (req, res) => {
  const { email, otp } = req.body;
  const visitor = await Visitor.findOne({ email });

  if (!visitor || visitor.otp !== otp || Date.now() > visitor.otpExpire) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  visitor.otp = null;
  visitor.otpExpire = null;
  await visitor.save();

  const token = jwt.sign({ id: visitor._id, role: "visitor" }, process.env.JWT_SECRET);
  res.json({ token });
};

// Visitor Dashboard (submit student mobile)
exports.notifyStudent = async (req, res) => {
    const { studentMobile } = req.body;
    const visitorId = req.user?.id;
    if (!visitorId) return res.status(401).json({ message: "Unauthorized" });
    
    const visitor = await Visitor.findById(visitorId);
    
    visitor.studentMobile = studentMobile;
    await visitor.save();
  
    // Find student by mobile number
    const student = await Student.findOne({ mobileNumber: studentMobile });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
  
    // Send Email
    const subject = "Parent Has Arrived at Campus";
    const message = `Dear ${student.name},\n\nYour parent has arrived at the campus and is waiting for you.\n\nThank you!`;
    await sendNotificationEmail({
      to: student.email,
      subject,
      text: message,
    });
    
  
    res.json({ message: "Student notified via email" });
  };