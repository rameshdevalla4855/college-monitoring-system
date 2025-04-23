// backend/utils/qrGenerator.js
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

const generateQRCode = async (userData, role, req) => {
  const qrDir = path.join(__dirname, "..", "qrcodes");

  if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir, { recursive: true });
    console.log("✅ Created qrcodes directory");
  }

  let identifier;
  if (role === "student") {
    identifier = userData.rollNumber;
  } else if (role === "faculty") {
    identifier = userData.facultyId;
  } else {
    throw new Error("Unsupported role for QR generation");
  }

  const fileName = `${identifier}_${role}.png`;
  const qrPath = path.join(qrDir, fileName);

  await QRCode.toFile(qrPath, identifier, {
    type: "png",
    width: 300,
    margin: 1,
  });

  const publicUrl = `${req.protocol}://${req.get("host")}/qrcodes/${fileName}`;
  return publicUrl;
};

module.exports = generateQRCode;
