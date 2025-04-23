// backend/controllers/studentController.js
const Student = require("../models/Student");
const generateQRCode = require("../utils/qrGenerator");

exports.getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Generate and store QR code if not already present
    if (!student.qrCodePath) {
      const qrCodeUrl = await generateQRCode(studentData, "student", req);
student.qrCodePath = qrCodeUrl;
await student.save();

      console.log("✅ QR Code generated and stored for student:", qrCodeUrl);
    }

    res.json(student);
  } catch (err) {
    console.error("❌ Student QR Generation Error:", err);
    res.status(500).json({ message: "Server error", err });
  }
};
