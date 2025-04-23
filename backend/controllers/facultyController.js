// backend/controllers/facultyController.js
const Faculty = require("../models/Faculty");
const generateQRCode = require("../utils/qrGenerator");

exports.getFacultyProfile = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.user.id);
    if (!faculty) return res.status(404).json({ message: "Faculty not found" });

    if (!faculty.qrCodePath) {
      const qrCodeUrl = await generateQRCode(facultyData, "faculty", req);
faculty.qrCodePath = qrCodeUrl;
await faculty.save();
      console.log("✅ QR Code generated and stored for faculty:", qrCodeUrl);
    }

    res.json(faculty);
  } catch (err) {
    console.error("❌ Faculty QR Generation Error:", err);
    res.status(500).json({ message: "Server error", err });
  }
};
